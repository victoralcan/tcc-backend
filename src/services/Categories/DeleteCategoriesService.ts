import { getCustomRepository } from 'typeorm';
import CategoriesRepository from '../../repositories/CategoriesRepository';

interface IRequestDTO {
  id: string;
}

class DeleteCategoriesService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    await categoriesRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteCategoriesService;
