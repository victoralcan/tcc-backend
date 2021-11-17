import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import * as Yup from 'yup';
import { cadastroSchema, updateSchema } from '../schemas/billSchema';

import BillsRepository from '../repositories/BillsRepository';
import CreateBillService from '../services/Bill/CreateBillService';
import DeleteBillService from '../services/Bill/DeleteBillService';
import UpdateBillService from '../services/Bill/UpdateBillService';
import SearchBillByTableIdService from '../services/Bill/SearchBillByTableIdService';
import CloseBillService from '../services/Bill/CloseBillService';

const billsRouter = Router();

billsRouter.get('/', async (request, response) => {
  const billsRepository = getCustomRepository(BillsRepository);
  const bills = await billsRepository.find({
    where: {
      end_date: undefined,
      active: true,
    },
  });

  return response.json(bills);
});

billsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const billsRepository = getCustomRepository(BillsRepository);
  const bill = await billsRepository.findOne({
    where: { id, active: true },
  });

  if (!bill) {
    return response.status(404).json({ error: 'Bill does not exists' });
  }
  return response.json(bill);
});

billsRouter.get('/search/:table_id', async (request, response) => {
  const { table_id } = request.params;
  if (!validate(table_id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const searchBillByTableId = new SearchBillByTableIdService();

  const bill = await searchBillByTableId.execute({ table_id });

  if (!bill) {
    return response
      .status(404)
      .json({ error: 'Bill for given table does not exist' });
  }
  return response.json(bill);
});

billsRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { table_id, end_date, total_value, active } = request.body;

  const createBill = new CreateBillService();

  let newBill;

  try {
    newBill = await createBill.execute({
      table_id,
      start_date: new Date().toISOString(),
      end_date,
      total_value,
      active,
    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newBill) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newBill);
});

billsRouter.post('/closeBill', async (request, response) => {
  const closeBillSchema = Yup.object().shape({
    bill_id: Yup.string().required(),
  });
  if (!(await closeBillSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { bill_id } = request.body;

  const closeBillService = new CloseBillService();

  try {
    await closeBillService.execute({ id: bill_id });
    return response.json({ message: 'Bill Closed' });
  } catch (e) {
    console.log(e);
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
});

billsRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const {
    id,
    table_id,
    start_date,
    end_date,
    total_value,
    active,
  } = request.body;

  const billToUpdate = {
    id,
    table_id,
    start_date,
    end_date,
    total_value,
    active,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateBill = new UpdateBillService();
  const updatedBill = await updateBill.execute(billToUpdate);

  if (!updatedBill) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedBill);
});

billsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteBill = new DeleteBillService();
  await deleteBill.execute({ id });

  return response.status(204).send();
});

export default billsRouter;
