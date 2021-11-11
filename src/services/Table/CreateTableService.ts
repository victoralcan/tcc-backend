import { getCustomRepository } from 'typeorm';
import TablesRepository from '../../repositories/TablesRepository';
import Table from '../../models/Table';

interface IRequestDTO {
  number: number;
  busy: boolean;
  seats: number;
  active: boolean;
}

class CreateTableService {
  public async execute(table: IRequestDTO): Promise<Table | undefined> {
    const tablesRepository = getCustomRepository(TablesRepository);

    try {
      const newTable = tablesRepository.create(table);
      await tablesRepository.save(newTable);
      return newTable;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateTableService;
