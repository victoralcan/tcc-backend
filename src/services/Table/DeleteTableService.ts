import { getCustomRepository } from 'typeorm';
import TablesRepository from '../../repositories/TablesRepository';

interface IRequestDTO {
  id: string;
}

class DeleteTableService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const tablesRepository = getCustomRepository(TablesRepository);
    await tablesRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteTableService;
