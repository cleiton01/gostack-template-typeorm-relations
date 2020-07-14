import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    // TODO
    const id = request.params.id;
    console.log('============');
    console.log(id);
    const findOrderService = await container.resolve(FindOrderService);

    const order = findOrderService.execute({id});

    return response.status(200).json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // TODO
    const {customer_id, products} = request.body;

    const createOrderService = await container.resolve(CreateOrderService);

    const order = await createOrderService.execute({customer_id, products});

    return response.status(200).json(order);
  }
}
