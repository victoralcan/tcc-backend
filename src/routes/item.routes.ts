import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/itemSchema';

import ItemRepository from '../repositories/ItemsRepository';
import CreateItemService from '../services/Item/CreateItemService';
import DeleteItemService from '../services/Item/DeleteItemService';
import UpdateItemService from '../services/Item/UpdateItemService';
import authMiddleware from '../middlewares/auth';

const ItemRouter = Router();

ItemRouter.get('/', async (request, response) => {
  const itemRepository = getCustomRepository(ItemRepository);
  const item = await itemRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(item);
});

ItemRouter.get('/:id', authMiddleware, async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const itemRepository = getCustomRepository(ItemRepository);
  const item = await itemRepository.findOne({
    where: { id, active: true },
  });

  if (!item) {
    return response.status(404).json({ error: ' Item does not exists' });
  }
  return response.json(item);
});

ItemRouter.post('/', authMiddleware, async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const {
    name,
    description,
    sub_category_id,
    value,
    image_url,
    active,
  } = request.body;

  const createItem = new CreateItemService();

  let newItem;

  try {
    newItem = await createItem.execute({
      name,
      description,
      sub_category_id,
      value,
      image_url,
      active,
    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newItem) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newItem);
});

ItemRouter.put('/', authMiddleware, async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const {
    id,
    name,
    description,
    sub_category_id,
    value,
    image_url,
    active,
  } = request.body;

  const itemToUpdate = {
    id,
    name,
    description,
    sub_category_id,
    value,
    image_url,
    active,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateItem = new UpdateItemService();
  const updatedItem = await updateItem.execute(itemToUpdate);

  if (!updatedItem) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedItem);
});

ItemRouter.delete('/:id', authMiddleware, async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteItem = new DeleteItemService();
  await deleteItem.execute({ id });

  return response.status(204).send();
});

export default ItemRouter;
