import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../../repositories/OrdersRepository';
import Order from '../../models/Order';
import Item from '../../models/Item';
import OrderItemRepository from '../../repositories/OrderItemRepository';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ItemReceived extends Item {
  description: string;
  quantity: number;
}

interface IRequestDTO {
  bill_id: string;
  user_id: string;
  ready: boolean;
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
    active,
    user_id,
  }: IRequestDTO): Promise<Order | undefined> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const orderItemRepository = getCustomRepository(OrderItemRepository);

    try {
      const newOrder = ordersRepository.create({
        bill_id,
        order_date,
        ready,
        active,
        user_id,
      });
      await ordersRepository.save(newOrder);
      items.forEach(item => {
        const { id, description, quantity } = item;
        orderItemRepository.create({
          item_id: id,
          order_id: newOrder.id,
          description,
          quantity,
        });
      });
      return newOrder;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateOrdersService;
