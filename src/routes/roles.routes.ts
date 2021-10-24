import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/roleSchema';

import RolesRepository from '../repositories/RolesRepository';
import CreateRolesService from '../services/Roles/CreateRolesService';
import DeleteRolesService from '../services/Roles/DeleteRolesService';
import UpdateRolesService from '../services/Roles/UpdateRolesService';

const RolesRoutes = Router();

RolesRoutes.get('/', async (request, response) => {
  const rolesRepository = getCustomRepository(RolesRepository);
  const roles = await rolesRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(roles);
});

RolesRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const rolesRepository = getCustomRepository(RolesRepository);
  const roles = await rolesRepository.findOne({
    where: { id, active: true },
  });

  if (!roles ) {
    return response.status(404).json({ error: ' Role does not exists' });
  }
  return response.json(roles);
});

RolesRoutes.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { name } = request.body;

  const createRole = new CreateRolesService();

  let newRole;

  try {
    newRole = await createRole.execute({
      name,

    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newRole) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newRole);
});

RolesRoutes.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const {
    id,
    name,


  } = request.body;

  const roleToUpdate = {

    id,
    name,

  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateRoles = new UpdateRolesService();
  const updatedRoles = await updateRoles.execute(roleToUpdate);

  if (!updatedRoles) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedRoles);
});

RolesRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteRoles = new DeleteRolesService();
  await deleteRoles.execute({ id });

  return response.status(204).send();
});

export default RolesRoutes;
