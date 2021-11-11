import { getCustomRepository } from 'typeorm';
import ItemsRepository from '../../repositories/ItemsRepository';
import Item from '../../models/Item';

interface IRequestDTO {
  name: string;
  description: string;
  sub_category_id: string;
  value: number;
  image_url: string;
  active: boolean;
}

class CreateItemService {
  public async execute(item: IRequestDTO): Promise<Item | undefined> {
    const itemRepository = getCustomRepository(ItemsRepository);

    try {
      const newItem = itemRepository.create(item);
      await itemRepository.save(newItem);
      return newItem;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateItemService;
