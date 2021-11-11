import { getCustomRepository } from 'typeorm';
import BillsRepository from '../../repositories/BillsRepository';

interface IRequestDTO {
  id: string;
}

class CloseBillService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const billsRepository = getCustomRepository(BillsRepository);
    await billsRepository.update(
      {
        id,
      },
      {
        end_date: new Date(),
      },
    );
  }
}

export default CloseBillService;
