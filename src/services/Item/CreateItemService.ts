import { getCustomRepository } from 'typeorm';
import ItemsRepository from '../../repositories/ItemsRepository';
import Item from '../../models/Item';

interface IRequestDTO {
  name: string;
  description: string;
  sub_category_id: string;
  value: number;

}

class CreateItemService {
  public async execute(Item: IRequestDTO): Promise<Item | undefined> {
    const itemRepository = getCustomRepository(ItemsRepository);

    try {
        
      const newItem = itemRepository.create(Item);
      await itemRepository.save(newItem);
      return newItem;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateItemService;
