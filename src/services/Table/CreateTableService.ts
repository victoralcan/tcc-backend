import { getCustomRepository } from 'typeorm';
import TablesRepository from '../../repositories/TablesRepository';
import Table from '../../models/Table';

interface IRequestDTO {
  number: number;
  busy: boolean;
  active: boolean;
}

class CreateTableService {
  public async execute(user: IRequestDTO): Promise<Table | undefined> {
    const tablesRepository = getCustomRepository(TablesRepository);

    try {
      const newTable = tablesRepository.create(user);
      await tablesRepository.save(newTable);
      return newTable;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateTableService;
