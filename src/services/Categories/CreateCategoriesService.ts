import { getCustomRepository } from 'typeorm';
import CategoriesRepository from '../../repositories/CategoriesRepository';
import Categories from '../../models/Category';

interface IRequestDTO {
  name: string;
  description: string;


  
}

class CreateCategoriesService {
  public async execute(categories: IRequestDTO): Promise<Categories | undefined> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    try {
        
      const newcategories = categoriesRepository.create(categories);
      await categoriesRepository.save(newcategories);
      return newcategories;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateCategoriesService;
