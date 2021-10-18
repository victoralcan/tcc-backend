import { getCustomRepository } from 'typeorm';
import UsersRepository from '../../repositories/UsersRepository';
import User from '../../models/User';

interface IRequestDTO {
  id: string;
  name: string;
  lastname: string;
  password: string;
  role_id: string;
  active: boolean;
}

class UpdateUserService {
  public async execute(toUpdateUser: IRequestDTO): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);
    const updateResult = await usersRepository.update(
      {
        id: toUpdateUser.id,
      },
      toUpdateUser,
    );

    if (updateResult.affected) {
      return await usersRepository.findOne({
        where: { id: toUpdateUser.id },
      });
    }
    return undefined;
  }
}

export default UpdateUserService;
