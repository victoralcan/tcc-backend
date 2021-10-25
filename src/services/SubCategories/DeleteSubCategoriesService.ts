import { getCustomRepository } from 'typeorm';
import SubCategoriesRepository from '../../repositories/SubCategoriesRepository';

interface IRequestDTO {
  id: string;
}

class DeleteSubCategoriesService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const subCategoriesRepository = getCustomRepository(SubCategoriesRepository);
    await subCategoriesRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteSubCategoriesService;
