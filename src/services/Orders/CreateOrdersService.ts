import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../../repositories/OrdersRepository';
import Order from '../../models/Order';

interface IRequestDTO {
  bill_id: string;
  user_id: string;
  start_date: string;
  ready: boolean;
  order_date: string;
  active: boolean;
}

class CreateOrdersService {
  public async execute(order: IRequestDTO): Promise<Order | undefined> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    try {
      const newOrder = ordersRepository.create(order);
      await ordersRepository.save(newOrder);
      return newOrder;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateOrdersService;
