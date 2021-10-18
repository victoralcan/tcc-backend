import { EntityRepository, Repository } from 'typeorm';

import Table from '../models/Table';

@EntityRepository(Table)
class TablesRepository extends Repository<Table> {}

export default TablesRepository;
