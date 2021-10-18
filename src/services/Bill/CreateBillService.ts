import { getCustomRepository } from 'typeorm';
import BillsRepository from '../../repositories/BillsRepository';
import Bill from '../../models/Bill';

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

    try {
      const newBill = billsRepository.create(bill);
      await billsRepository.save(newBill);
      return newBill;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateBillService;
