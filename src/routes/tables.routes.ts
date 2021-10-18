import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/tableSchema';

import TablesRepository from '../repositories/TablesRepository';
import CreateTableService from '../services/Table/CreateTableService';
import DeleteTableService from '../services/Table/DeleteTableService';
import UpdateTableService from '../services/Table/UpdateTableService';

const tablesRouter = Router();

tablesRouter.get('/', async (request, response) => {
  const tablesRepository = getCustomRepository(TablesRepository);
  const tables = await tablesRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(tables);
});

tablesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const tablesRepository = getCustomRepository(TablesRepository);
  const table = await tablesRepository.findOne({
    where: { id, active: true },
  });

  if (!table) {
    return response.status(404).json({ error: 'Table does not exists' });
  }
  return response.json(table);
});

tablesRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { number, busy, active } = request.body;

  const createTable = new CreateTableService();

  let newTable;

  try {
    newTable = await createTable.execute({
      number,
      busy,
      active,
    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newTable) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newTable);
});

tablesRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { id, number, busy, active } = request.body;

  const tableToUpdate = {
    id,
    number,
    busy,
    active,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateTable = new UpdateTableService();
  const updatedTable = await updateTable.execute(tableToUpdate);

  if (!updatedTable) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedTable);
});

tablesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteTable = new DeleteTableService();
  await deleteTable.execute({ id });

  return response.status(204).send();
});

export default tablesRouter;
