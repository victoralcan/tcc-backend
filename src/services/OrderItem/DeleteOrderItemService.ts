import { getCustomRepository } from 'typeorm';
import OrderItemRepository from '../../repositories/OrderItemRepository';

interface IRequestDTO {
  id: string;
}

class DeleteOrderItemService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const orderItemRepository = getCustomRepository(OrderItemRepository);
    await orderItemRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteOrderItemService;
