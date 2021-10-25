import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../../repositories/OrdersRepository';

interface IRequestDTO {
  id: string;
}

class DeleteOrdersService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    await ordersRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteOrdersService;
