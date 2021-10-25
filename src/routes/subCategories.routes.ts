import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/subCategoriesSchema';

import SubCategorysRepository from '../repositories/SubCategoriesRepository';
import CreateSubCategoriesService from '../services/SubCategory/CreateSubCategoriesService';
import DeleteSubCategoriesService from '../services/SubCategory/DeleteSubCategoriesService';
import UpdateSubCategoriesService from '../services/SubCategory/UpdateSubCategoriesService';

const SubCategorysRoutes = Router();

SubCategorysRoutes.get('/', async (request, response) => {
  const subCategoriesRepository = getCustomRepository(SubCategorysRepository);
  const subCategories = await subCategoriesRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(subCategories);
});

SubCategorysRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const subCategoriesRepository = getCustomRepository(SubCategorysRepository);
  const subCategories = await subCategoriesRepository.findOne({
    where: { id, active: true },
  });

  if (!subCategories) {
    return response
      .status(404)
      .json({ error: ' Sub-Category does not exists' });
  }
  return response.json(subCategories);
});

SubCategorysRoutes.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { name, description, category_id, active } = request.body;

  const createSubCategory = new CreateSubCategoriesService();

  let newSubCategory;

  try {
    newSubCategory = await createSubCategory.execute({
      name,
      description,
      category_id,
      active,
    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newSubCategory) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newSubCategory);
});

SubCategorysRoutes.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { id, name, description, category_id, active } = request.body;

  const subCategoryToUpdate = {
    id,
    name,
    description,
    category_id,
    active,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateSubCategorys = new UpdateSubCategoriesService();
  const updatedSubCategorys = await updateSubCategorys.execute(
    subCategoryToUpdate,
  );

  if (!updatedSubCategorys) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedSubCategorys);
});

SubCategorysRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteSubCategory = new DeleteSubCategoriesService();
  await deleteSubCategory.execute({ id });

  return response.status(204).send();
});

export default SubCategorysRoutes;
