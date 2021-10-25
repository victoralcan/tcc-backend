import { getCustomRepository } from 'typeorm';
import OrderItemRepository from '../../repositories/OrderItemRepository';
import OrderItem from '../../models/OrderItem';

interface IRequestDTO {
  order_id: string;
  item_id: string;
  quantity: number;
  active: boolean;
}

class CreateOrdeItemService {
  public async execute(orderItem: IRequestDTO): Promise<OrderItem | undefined> {
    const orderItemRepository = getCustomRepository(OrderItemRepository);

    try {
      const newOrderItem = orderItemRepository.create(orderItem);
      await orderItemRepository.save(newOrderItem);
      return newOrderItem;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateOrdeItemService;
