import { getCustomRepository } from 'typeorm';
import RolesRepository from '../../repositories/RolesRepository';
import Roles from '../../models/Role';

interface IRequestDTO {
  id: string;
  name: string;



}

class UpdateRolesService {
  public async execute(toUpdateRoles: IRequestDTO): Promise<Roles | undefined> {
    const rolesRepository = getCustomRepository(RolesRepository);
    const updateResult = await rolesRepository.update(
      {
        id: toUpdateRoles.id,
      },
      toUpdateRoles,
    );

    if (updateResult.affected) {
      return await rolesRepository.findOne({
        where: { id: toUpdateRoles.id },
      });
    }
    return undefined;
  }
}

export default UpdateRolesService;