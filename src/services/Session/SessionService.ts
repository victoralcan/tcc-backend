import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import authConfig from '../../config/auth';
import UsersRepository from '../../repositories/UsersRepository';

// @ts-ignore
export const CreateSession = async (req, res): Promise<void> => {
  const schema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  const { username, password } = req.body;

  const usersRepository = getCustomRepository(UsersRepository);

  const existUser = await usersRepository.findOne({
    where: {
      name: username,
    },
  });

  if (!existUser) {
    return res.status(401).json({ error: 'User not found' });
  }

  const validPassword = await compare(password, existUser.password);

  if (!validPassword) {
    return res.status(401).json({ error: 'Password does not match' });
  }

  return res.json({
    token: jwt.sign({ id: existUser.id }, authConfig.secret || '', {
      expiresIn: authConfig.expiresIn,
    }),
  });
};

// @ts-ignore
export const GetSession = async (request, response): Promise<void> => {
  const schema = Yup.object().shape({
    userId: Yup.string().required(),
  });

  if (!(await schema.isValid(request))) {
    return response.status(400).json({ error: 'Validation fails' });
  }
  const { userId } = request;

  const usersRepository = getCustomRepository(UsersRepository);

  const user = await usersRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return response.status(500).send();
  }

  // @ts-ignore
  delete user.password;
  // @ts-ignore
  delete user.created_at;
  // @ts-ignore
  delete user.updated_at;

  return response.json(user);
};
