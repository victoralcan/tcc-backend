import { getCustomRepository } from 'typeorm';
import RolesRepository from '../../repositories/RolesRepository';
import Roles from '../../models/Role';

interface IRequestDTO {
  name: string;
  active: boolean;
}

class CreateRolesService {
  public async execute(roles: IRequestDTO): Promise<Roles | undefined> {
    const rolesRepository = getCustomRepository(RolesRepository);

    try {
      const newrole = rolesRepository.create(roles);
      await rolesRepository.save(newrole);
      return newrole;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateRolesService;
