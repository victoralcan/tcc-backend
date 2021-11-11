import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  table_id: Yup.string().required(),
  start_date: Yup.string().required(),
  end_date: Yup.string().required(),
  total_value: Yup.number().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  table_id: Yup.string().required(),
  start_date: Yup.string().required(),
  end_date: Yup.string().required(),
  total_value: Yup.number().required(),
});
