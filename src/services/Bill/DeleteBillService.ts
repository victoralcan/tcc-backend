import { getCustomRepository } from 'typeorm';
import BillsRepository from '../../repositories/BillsRepository';

interface IRequestDTO {
  id: string;
}

class DeleteBillService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const billsRepository = getCustomRepository(BillsRepository);
    await billsRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteBillService;
