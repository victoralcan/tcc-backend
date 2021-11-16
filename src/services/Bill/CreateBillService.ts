import { getCustomRepository } from 'typeorm';
import BillsRepository from '../../repositories/BillsRepository';
import Bill from '../../models/Bill';
import TablesRepository from '../../repositories/TablesRepository';

interface IRequestDTO {
  table_id: string;
  start_date: string;
  end_date: string;
  total_value: number;
  active: boolean;
}

class CreateBillService {
  public async execute(bill: IRequestDTO): Promise<Bill | undefined> {
    const billsRepository = getCustomRepository(BillsRepository);
    const tablesRepository = getCustomRepository(TablesRepository);

    try {
      const newBill = billsRepository.create(bill);
      await billsRepository.save(newBill);
      await tablesRepository.update(
        {
          id: bill.table_id,
        },
        {
          busy: true,
        },
      );
      return newBill;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateBillService;
