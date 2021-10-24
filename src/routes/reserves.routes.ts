import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/reservesSchema';

import ReservesRepository from '../repositories/ReservesRepository';
import CreateReserveService from '../services/Reserves/CreateReserveService';
import DeleteReserveService from '../services/Reserves/DeleteReserveService';
import UpdateReserveService from '../services/Reserves/UpdateReserveService';

const reservesRouter = Router();

reservesRouter.get('/', async (request, response) => {
  const reservesRepository = getCustomRepository(ReservesRepository);
  const reserves = await reservesRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(reserves);
});

reservesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const reservesRepository = getCustomRepository(ReservesRepository);
  const reserve = await reservesRepository.findOne({
    where: { id, active: true },
  });

  if (!reserve) {
    return response.status(404).json({ error: 'Reserve does not exists' });
  }
  return response.json(reserve);
});

reservesRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { table_id, start_date, name, contact, amount } = request.body;

  const createReserve = new CreateReserveService();

  let newReserve;

  try {
    newReserve = await createReserve.execute({
      table_id,
      start_date,
      name,
      contact,
      amount,
    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newReserve) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newReserve);
});

reservesRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const {
    id,
    table_id,
    start_date,
    name,
    contact,
    amount,
  } = request.body;

  const reserveToUpdate = {
    id,
    table_id,
    start_date,
    name,
    contact,
    amount,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateReserve = new UpdateReserveService();
  const updatedReserve = await updateReserve.execute(reserveToUpdate);

  if (!updatedReserve) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedReserve);
});

reservesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteReserve = new DeleteReserveService();
  await deleteReserve.execute({ id });

  return response.status(204).send();
});

export default reservesRouter;
