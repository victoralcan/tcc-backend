import { getCustomRepository } from 'typeorm';
import ReservesRepository from '../../repositories/ReservesRepository';
import Reserve from '../../models/Reserve';

interface IRequestDTO {
  id: string;
  table_id: string;
  start_date: string;
  name: string;
  contact: string;
  amount: number;
  active: boolean;
}

class UpdateReserveService {
  public async execute(
    toUpdateReserve: IRequestDTO,
  ): Promise<Reserve | undefined> {
    const reservesRepository = getCustomRepository(ReservesRepository);
    const updateResult = await reservesRepository.update(
      {
        id: toUpdateReserve.id,
      },
      toUpdateReserve,
    );

    if (updateResult.affected) {
      return await reservesRepository.findOne({
        where: { id: toUpdateReserve.id },
      });
    }
    return undefined;
  }
}

export default UpdateReserveService;
