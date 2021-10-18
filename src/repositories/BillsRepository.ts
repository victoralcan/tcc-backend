import { EntityRepository, Repository } from 'typeorm';

import Bill from '../models/Bill';

@EntityRepository(Bill)
class BillsRepository extends Repository<Bill> {}

export default BillsRepository;
