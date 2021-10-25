import { getCustomRepository } from 'typeorm';
import ReservesRepository from '../../repositories/ReservesRepository';

interface IRequestDTO {
  id: string;
}

class DeleteReserveService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const reservesRepository = getCustomRepository(ReservesRepository);
    await reservesRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteReserveService;
