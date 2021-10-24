import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/subCategoriesSchema';

import SubCategoriesRepository from '../repositories/SubCategoriesRepository';
import CreateSubCategoriesService from '../services/SubCategories/CreateSubCategoriesService';
import DeleteSubCategoriesService from '../services/SubCategories/DeleteSubCategoriesService';
import UpdateSubCategoriesService from '../services/SubCategories/UpdateSubCategoriesService';

const SubCategoriesRoutes = Router();

SubCategoriesRoutes.get('/', async (request, response) => {
  const subCategoriesRepository = getCustomRepository(SubCategoriesRepository);
  const subCategories = await subCategoriesRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(subCategories);
});

SubCategoriesRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const subCategoriesRepository = getCustomRepository(SubCategoriesRepository);
  const subCategories = await subCategoriesRepository.findOne({
    where: { id, active: true },
  });

  if (!subCategories ) {
    return response.status(404).json({ error: ' Sub-Category does not exists' });
  }
  return response.json(subCategories);
});

SubCategoriesRoutes.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { name, description, category_id } = request.body;

  const createSubCategorie = new CreateSubCategoriesService();

  let newSubCategorie;

  try {
    newSubCategorie = await createSubCategorie.execute({
      name,
      description,
      category_id,


    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newSubCategorie) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newSubCategorie);
});

SubCategoriesRoutes.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const {
    id,
    name,
    description,
    category_id,


  } = request.body;

  const subCategoryToUpdate = {

    id,
    name,
    description,
    category_id,

  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateSubCategories = new UpdateSubCategoriesService();
  const updatedSubCategories = await updateSubCategories.execute(subCategoryToUpdate);

  if (!updatedSubCategories) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedSubCategories);
});

SubCategoriesRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteSubCategory = new DeleteSubCategoriesService();
  await deleteSubCategory.execute({ id });

  return response.status(204).send();
});

export default SubCategoriesRoutes;
