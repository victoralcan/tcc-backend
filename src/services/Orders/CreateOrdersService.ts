import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../../repositories/OrdersRepository';
import Order from '../../models/Order';
import Item from '../../models/Item';
import OrderItemRepository from '../../repositories/OrderItemRepository';
import BillsRepository from '../../repositories/BillsRepository';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ItemReceived extends Item {
  description: string;
  quantity: number;
}

interface IRequestDTO {
  bill_id: string;
  user_id: string;
  ready: boolean;
  delivered: boolean;
  order_date: string;
  items: ItemReceived[];
  active: boolean;
}

class CreateOrdersService {
  public async execute({
    items,
    bill_id,
    order_date,
    ready,
    delivered,
    active,
    user_id,
  }: IRequestDTO): Promise<Order | undefined> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const orderItemRepository = getCustomRepository(OrderItemRepository);
    const billsRepository = getCustomRepository(BillsRepository);

    try {
      const newOrder = ordersRepository.create({
        bill_id,
        order_date,
        ready,
        delivered,
        active,
        user_id,
      });
      await ordersRepository.save(newOrder);
      let total_value = 0;
      for (const item of items) {
        const { id, description, quantity, value } = item;
        total_value += value;
        const orderItem = orderItemRepository.create({
          item_id: id,
          order_id: newOrder.id,
          description,
          quantity,
          active: true,
        });
        await orderItemRepository.save(orderItem);
      }
      const bill = await billsRepository.findOne({
        where: {
          id: bill_id,
        },
      });
      if (bill) {
        await billsRepository.update(
          {
            id: bill_id,
          },
          {
            total_value: bill?.total_value + total_value,
          },
        );
      }
      return newOrder;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}

export default CreateOrdersService;
