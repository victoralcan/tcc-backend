import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  name: Yup.string().required(),
  password: Yup.string().required(),
  lastname: Yup.string().required(),
  role_id: Yup.string().required(),
  active: Yup.boolean().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
  password: Yup.string().required(),
  lastname: Yup.string().required(),
  role_id: Yup.string().required(),
  active: Yup.boolean().required(),
});
