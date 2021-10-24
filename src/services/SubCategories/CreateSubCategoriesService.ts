import { getCustomRepository } from 'typeorm';
import SubCategoriesRepository from '../../repositories/SubCategoriesRepository';
import SubCategories from '../../models/SubCategory';

interface IRequestDTO {
  name: string;
  description: string;
  category_id: string;

  
}

class CreateSubCategoriesService {
  public async execute(subCategories: IRequestDTO): Promise<SubCategories | undefined> {
    const subCategoriesRepository = getCustomRepository(SubCategoriesRepository);

    try {
        
      const newSubCategories = subCategoriesRepository.create(subCategories);
      await subCategoriesRepository.save(newSubCategories);
      return newSubCategories;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateSubCategoriesService;
