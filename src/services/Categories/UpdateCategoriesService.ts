import { getCustomRepository } from 'typeorm';
import CategoriesRepository from '../../repositories/CategoriesRepository';
import Category from '../../models/Category';

interface IRequestDTO {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

class UpdateCategoriesService {
  public async execute(
    toUpdateCategory: IRequestDTO,
  ): Promise<Category | undefined> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const updateResult = await categoriesRepository.update(
      {
        id: toUpdateCategory.id,
      },
      toUpdateCategory,
    );

    if (updateResult.affected) {
      return await categoriesRepository.findOne({
        where: { id: toUpdateCategory.id },
      });
    }
    return undefined;
  }
}

export default UpdateCategoriesService;
