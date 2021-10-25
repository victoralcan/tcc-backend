import { getCustomRepository } from 'typeorm';
import ReservesRepository from '../../repositories/ReservesRepository';
import Reserve from '../../models/Reserve';

interface IRequestDTO {
  table_id: string;
  start_date: string;
  name: string;
  contact: string;
  amount: number;
  active: boolean;
}

class CreateReserveService {
  public async execute(reserve: IRequestDTO): Promise<Reserve | undefined> {
    const reservesRepository = getCustomRepository(ReservesRepository);

    try {
      const newReserve = reservesRepository.create(reserve);
      await reservesRepository.save(newReserve);
      return newReserve;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateReserveService;
