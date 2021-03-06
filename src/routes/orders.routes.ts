import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/ordersSchema';

import OrdersRepository from '../repositories/OrdersRepository';
import CreateOrdersService from '../services/Orders/CreateOrdersService';
import DeleteOrdersService from '../services/Orders/DeleteOrdersService';
import UpdateOrdersService from '../services/Orders/UpdateOrdersService';
import SearchBillByTableIdService from '../services/Bill/SearchBillByTableIdService';

const orderRouter = Router();

orderRouter.get('/', async (request, response) => {
  const ordersRepository = getCustomRepository(OrdersRepository);
  const orders = await ordersRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(orders);
});

orderRouter.get('/notReady', async (request, response) => {
  const ordersRepository = getCustomRepository(OrdersRepository);
  const orders = await ordersRepository.find({
    where: {
      ready: false,
      delivered: false,
      active: true,
    },
  });

  return response.json(orders);
});

orderRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const ordersRepository = getCustomRepository(OrdersRepository);
  const order = await ordersRepository.findOne({
    where: { id, active: true },
  });

  if (!order) {
    return response.status(404).json({ error: 'Order does not exists' });
  }
  return response.json(order);
});

orderRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { table_id, ready, items, delivered, active } = request.body;

  const createOrder = new CreateOrdersService();
  const searchBillByTableId = new SearchBillByTableIdService();
  let newOrder;

  try {
    const bill = await searchBillByTableId.execute({ table_id });
    if (bill) {
      newOrder = await createOrder.execute({
        bill_id: bill?.id,
        // @ts-ignore
        user_id: request.userId,
        ready,
        order_date: new Date().toISOString(),
        delivered,
        items,
        active,
      });
    }
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newOrder) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newOrder);
});

orderRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { id, bill_id, ready, order_date, delivered, active } = request.body;

  const orderToUpdate = {
    id,
    bill_id,
    // @ts-ignore
    user_id: request.userId,
    ready,
    order_date,
    delivered,
    active,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateOrder = new UpdateOrdersService();
  const updatedOrder = await updateOrder.execute(orderToUpdate);

  if (!updatedOrder) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedOrder);
});

orderRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteOrder = new DeleteOrdersService();
  await deleteOrder.execute({ id });

  return response.status(204).send();
});

export default orderRouter;
