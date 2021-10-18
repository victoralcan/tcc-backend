import { getCustomRepository } from 'typeorm';
import TablesRepository from '../../repositories/TablesRepository';
import Table from '../../models/Table';

interface IRequestDTO {
  id: string;
  number: number;
  busy: boolean;
  active: boolean;
}

class UpdateTableService {
  public async execute(toUpdateTable: IRequestDTO): Promise<Table | undefined> {
    const tablesRepository = getCustomRepository(TablesRepository);
    const updateResult = await tablesRepository.update(
      {
        id: toUpdateTable.id,
      },
      toUpdateTable,
    );

    if (updateResult.affected) {
      return await tablesRepository.findOne({
        where: { id: toUpdateTable.id },
      });
    }
    return undefined;
  }
}

export default UpdateTableService;
