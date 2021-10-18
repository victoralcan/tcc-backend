import { getCustomRepository } from 'typeorm';
import UsersRepository from '../../repositories/UsersRepository';

interface IRequestDTO {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    await usersRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteUserService;
