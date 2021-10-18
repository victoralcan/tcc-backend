import { EntityRepository, Repository } from 'typeorm';

import SubCategory from '../models/SubCategory';

@EntityRepository(SubCategory)
class SubCategoriesRepository extends Repository<SubCategory> {}

export default SubCategoriesRepository;
