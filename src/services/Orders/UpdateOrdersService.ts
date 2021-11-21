import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../../repositories/OrdersRepository';
import Order from '../../models/Order';

interface IRequestDTO {
  id: string;
  bill_id: string;
  user_id: string;
  ready: boolean;
  delivered: boolean;
  order_date: string;
  active: boolean;
}

class UpdateOrdersService {
  public async execute(
    toUpdateOrders: IRequestDTO,
  ): Promise<Order | undefined> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const updateResult = await ordersRepository.update(
      {
        id: toUpdateOrders.id,
      },
      toUpdateOrders,
    );

    if (updateResult.affected) {
      return await ordersRepository.findOne({
        where: { id: toUpdateOrders.id },
      });
    }
    return undefined;
  }
}

export default UpdateOrdersService;
