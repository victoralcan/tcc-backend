import { getCustomRepository } from 'typeorm';
import OrderItemRepository from '../../repositories/OrderItemRepository';
import OrderItem from '../../models/OrderItem';

interface IRequestDTO {
  id: string;
  order_id: string;
  item_id: string;
  quantity: number;
  description: string;
  active: boolean;
}

class UpdateOrderItemService {
  public async execute(
    toUpdateOrderItem: IRequestDTO,
  ): Promise<OrderItem | undefined> {
    const orderItemRepository = getCustomRepository(OrderItemRepository);
    const updateResult = await orderItemRepository.update(
      {
        id: toUpdateOrderItem.id,
      },
      toUpdateOrderItem,
    );

    if (updateResult.affected) {
      return await orderItemRepository.findOne({
        where: { id: toUpdateOrderItem.id },
      });
    }
    return undefined;
  }
}

export default UpdateOrderItemService;
