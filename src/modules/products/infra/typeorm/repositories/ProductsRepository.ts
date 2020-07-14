import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    // TODO
    const product = await this.ormRepository.create({
      name,
      price,
      quantity
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    // TODO
    const product = await this.ormRepository.findOne({where: {name}});

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    // TODO
    const product = await this.ormRepository.findByIds(products);

    return product;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    // TODO
    const productIds = products.map(product => ({id: product.id}) as IFindProducts);

    let foundProducts = await this.findAllById(productIds);

    const updatedProduct = foundProducts.map((product, product_index) => {
      const reduceStockAmount = products[product_index].quantity;

      const quantity = product.quantity - reduceStockAmount;

      const productUpdated = { ...product, quantity } as Product;

      return productUpdated;
    });

    await this.ormRepository.save(updatedProduct);

    return updatedProduct;
  }
}

export default ProductsRepository;
