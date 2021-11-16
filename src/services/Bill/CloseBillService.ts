import { getCustomRepository } from 'typeorm';
import BillsRepository from '../../repositories/BillsRepository';
import TablesRepository from '../../repositories/TablesRepository';

interface IRequestDTO {
  id: string;
}

class CloseBillService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const billsRepository = getCustomRepository(BillsRepository);
    const tablesRepository = getCustomRepository(TablesRepository);
    await billsRepository.update(
      {
        id,
      },
      {
        end_date: new Date(),
      },
    );
    const updatedBill = await billsRepository.findOne({
      where: {
        id,
      },
    });
    await tablesRepository.update(
      {
        id: updatedBill?.table_id,
      },
      {
        busy: false,
      },
    );
  }
}

export default CloseBillService;
