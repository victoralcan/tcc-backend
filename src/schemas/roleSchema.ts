import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  name: Yup.string().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
});
