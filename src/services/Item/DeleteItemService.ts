import { getCustomRepository } from 'typeorm';
import ItemsRepository from '../../repositories/ItemsRepository';

interface IRequestDTO {
  id: string;
}

class DeleteItemService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const itemRepository = getCustomRepository(ItemsRepository);
    await itemRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteItemService;
