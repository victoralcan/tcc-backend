import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  number: Yup.number().required(),
  busy: Yup.boolean().required(),
  active: Yup.boolean().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  number: Yup.number().required(),
  busy: Yup.boolean().required(),
  active: Yup.boolean().required(),
});
