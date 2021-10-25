import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  sub_category_id: Yup.string().required(),
  value: Yup.number().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  sub_category_id: Yup.string().required(),
  value: Yup.number().required(),
});