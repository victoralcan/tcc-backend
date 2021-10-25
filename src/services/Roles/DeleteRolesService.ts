import { getCustomRepository } from 'typeorm';
import RolesRepository from '../../repositories/RolesRepository';

interface IRequestDTO {
  id: string;
}

class DeleteRolesService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const rolesRepository = getCustomRepository(RolesRepository);
    await rolesRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteRolesService;