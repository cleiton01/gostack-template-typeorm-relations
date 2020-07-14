import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

interface IFindProduct {
  id: string;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    // TODO
    const customer = await this.customersRepository.findById(customer_id);

    if(!customer){
      throw new AppError('User invalid, user doesnt exists',400 );
    }

    const productsIds = products.map<IFindProduct>(product => ({
      id: product.id,
    }));

    const productsInStock = await this.productsRepository.findAllById(
      productsIds,
    );

    const productsInOrder = productsInStock.map(stockProduct => {
      const product = products.find(prod => prod.id === stockProduct.id);

      if (!product) {
        throw new AppError(`Produto nao encontrado: ${product}.`, 404);
      }

      if (product.quantity > stockProduct.quantity) {
        throw new AppError('Quantidade indisponivel.', 400);
      }

      return {
        product_id: product.id,
        price: stockProduct.price,
        quantity: product.quantity,
      };
    });

    const order = await this.ordersRepository.create({
      customer,
      products: productsInOrder,
    });

    await this.productsRepository.updateQuantity(products);


    return order;

  }
}

export default CreateOrderService;
