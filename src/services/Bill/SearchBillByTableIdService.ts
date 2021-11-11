import { getCustomRepository } from 'typeorm';
import BillsRepository from '../../repositories/BillsRepository';
import Bill from '../../models/Bill';

interface IRequestDTO {
  table_id: string;
}

class SearchBillByTableIdService {
  public async execute({ table_id }: IRequestDTO): Promise<Bill | undefined> {
    const billsRepository = getCustomRepository(BillsRepository);

    try {
      const bill = billsRepository.findOne({
        where: {
          table_id,
          end_date: undefined,
        },
      });
      return bill;
    } catch (e) {
      return undefined;
    }
  }
}

export default SearchBillByTableIdService;
