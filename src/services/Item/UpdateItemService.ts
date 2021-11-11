import { getCustomRepository } from 'typeorm';
import ItemRepository from '../../repositories/ItemsRepository';
import Item from '../../models/Item';

interface IRequestDTO {
  id: string;
  name: string;
  description: string;
  sub_category_id: string;
  value: number;
  image_url: string;
  active: boolean;
}

class UpdateItemService {
  public async execute(toUpdateItem: IRequestDTO): Promise<Item | undefined> {
    const itemRepository = getCustomRepository(ItemRepository);
    const updateResult = await itemRepository.update(
      {
        id: toUpdateItem.id,
      },
      toUpdateItem,
    );

    if (updateResult.affected) {
      return await itemRepository.findOne({
        where: { id: toUpdateItem.id },
      });
    }
    return undefined;
  }
}

export default UpdateItemService;
