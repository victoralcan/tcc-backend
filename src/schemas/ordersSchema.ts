import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  bill_id: Yup.string().required(),
  user_id: Yup.string().required(),
  start_date: Yup.string().required(),
  ready: Yup.boolean().required(),
  order_date: Yup.string().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  bill_id: Yup.string().required(),
  user_id: Yup.string().required(),
  start_date: Yup.string().required(),
  ready: Yup.boolean().required(),
  order_date: Yup.string().required(),
});