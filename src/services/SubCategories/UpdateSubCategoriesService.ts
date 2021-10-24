import { getCustomRepository } from 'typeorm';
import SubCategoriesRepository from '../../repositories/SubCategoriesRepository';
import SubCategory from '../../models/SubCategory';

interface IRequestDTO {
  id: string;
  name: string;
  description: string;
  category_id: string;

}

class UpdateSubCategoriesService {
  public async execute(toUpdateSubCategory: IRequestDTO): Promise<SubCategory | undefined> {
    const subCategoriesRepository = getCustomRepository(SubCategoriesRepository);
    const updateResult = await subCategoriesRepository.update(
      {
        id: toUpdateSubCategory.id,
      },
      toUpdateSubCategory,
    );

    if (updateResult.affected) {
      return await subCategoriesRepository.findOne({
        where: { id: toUpdateSubCategory.id },
      });
    }
    return undefined;
  }
}

export default UpdateSubCategoriesService;