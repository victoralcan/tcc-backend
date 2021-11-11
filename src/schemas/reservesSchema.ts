import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  table_id: Yup.string().required(),
  start_date: Yup.string().required(),
  name: Yup.string().required(),
  contact: Yup.string().required(),
  amount: Yup.number().required(),
  active: Yup.boolean().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  table_id: Yup.string().required(),
  start_date: Yup.string().required(),
  name: Yup.string().required(),
  contact: Yup.string().required(),
  amount: Yup.number().required(),
  active: Yup.boolean().required(),
});
