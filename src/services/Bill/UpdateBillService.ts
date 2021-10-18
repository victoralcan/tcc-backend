import { getCustomRepository } from 'typeorm';
import BillsRepository from '../../repositories/BillsRepository';
import Bill from '../../models/Bill';

interface IRequestDTO {
  id: string;
  table_id: string;
  start_date: string;
  end_date: string;
  total_value: number;
  active: boolean;
}

class UpdateBillService {
  public async execute(toUpdateBill: IRequestDTO): Promise<Bill | undefined> {
    const billsRepository = getCustomRepository(BillsRepository);
    const updateResult = await billsRepository.update(
      {
        id: toUpdateBill.id,
      },
      toUpdateBill,
    );

    if (updateResult.affected) {
      return await billsRepository.findOne({
        where: { id: toUpdateBill.id },
      });
    }
    return undefined;
  }
}

export default UpdateBillService;
