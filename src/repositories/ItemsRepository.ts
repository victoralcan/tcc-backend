import { EntityRepository, Repository } from 'typeorm';

import Item from '../models/Item';

@EntityRepository(Item)
class ItemsRepository extends Repository<Item> {}

export default ItemsRepository;
