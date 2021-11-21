import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  table_id: Yup.string().required(),
  ready: Yup.boolean().required(),
  delivered: Yup.boolean().required(),
  items: Yup.array().required(),
  active: Yup.boolean().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  bill_id: Yup.string().required(),
  ready: Yup.boolean().required(),
  delivered: Yup.boolean().required(),
  order_date: Yup.string().required(),
  active: Yup.boolean().required(),
});
