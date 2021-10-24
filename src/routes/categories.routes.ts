import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/categoriesSchema';

import CategoriesRepository from '../repositories/CategoriesRepository';
import CreateCategoriesService from '../services/Categories/CreateCategoriesService';
import DeleteCategoriesService from '../services/Categories/DeleteCategoriesService';
import UpdateCategoriesService from '../services/Categories/UpdateCategoriesService';

const CategoriesRoutes = Router();

CategoriesRoutes.get('/', async (request, response) => {
  const categoriesRepository = getCustomRepository(CategoriesRepository);
  const categories = await categoriesRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(categories);
});

CategoriesRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const categoriesRepository = getCustomRepository(CategoriesRepository);
  const categories = await categoriesRepository.findOne({
    where: { id, active: true },
  });

  if (!categories ) {
    return response.status(404).json({ error: ' Category does not exists' });
  }
  return response.json(categories);
});

CategoriesRoutes.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { name, description } = request.body;

  const createCategorie = new CreateCategoriesService();

  let newCategorie;

  try {
    newCategorie = await createCategorie.execute({
      name,
      description,

    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newCategorie) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newCategorie);
});

CategoriesRoutes.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const {
    id,
    name,
    description,



  } = request.body;

  const categoryToUpdate = {

    id,
    name,
    description,

  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateCategories = new UpdateCategoriesService();
  const updatedCategories = await updateCategories.execute(categoryToUpdate);

  if (!updatedCategories) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedCategories);
});

CategoriesRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteCategory = new DeleteCategoriesService();
  await deleteCategory.execute({ id });

  return response.status(204).send();
});

export default CategoriesRoutes;
