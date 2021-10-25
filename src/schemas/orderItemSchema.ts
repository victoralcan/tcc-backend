import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  order_id: Yup.string().required(),
  item_id: Yup.string().required(),
  quantity: Yup.number().integer().required(),

});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  order_id: Yup.string().required(),
  item_id: Yup.string().required(),
  quantity: Yup.number().integer().required(),

});
