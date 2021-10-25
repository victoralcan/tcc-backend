import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/orderItemSchema';

import OrderItemRepository from '../repositories/OrderItemRepository';
import CreateOrderItemService from '../services/OrderItem/CreateOrderItemService';
import DeleteOrderItemService from '../services/OrderItem/DeleteOrderItemService';
import UpdateOrderItemService from '../services/OrderItem/UpdateOrderItemService';

const orderItemRouter = Router();

orderItemRouter.get('/', async (request, response) => {
  const orderItemRepository = getCustomRepository(OrderItemRepository);
  const orderItem = await orderItemRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(orderItem);
});

orderItemRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const orderItemRepository = getCustomRepository(OrderItemRepository);
  const orderItem = await orderItemRepository.findOne({
    where: { id, active: true },
  });

  if (!orderItem) {
    return response.status(404).json({ error: 'Order item does not exists' });
  }
  return response.json(orderItem);
});

orderItemRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { order_id, item_id, quantity, active } = request.body;

  const createOrderItem = new CreateOrderItemService();

  let newOrderItem;

  try {
    newOrderItem = await createOrderItem.execute({
      order_id,
      item_id,
      quantity,
      active,
    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newOrderItem) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newOrderItem);
});

orderItemRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { id, order_id, item_id, quantity, active } = request.body;

  const orderItemToUpdate = {
    id,
    order_id,
    item_id,
    quantity,
    active,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateOrderItem = new UpdateOrderItemService();
  const updatedOrderItem = await updateOrderItem.execute(orderItemToUpdate);

  if (!updatedOrderItem) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedOrderItem);
});

orderItemRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteOrderItem = new DeleteOrderItemService();
  await deleteOrderItem.execute({ id });

  return response.status(204).send();
});

export default orderItemRouter;
