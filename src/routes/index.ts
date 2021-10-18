import { Router } from 'express';

import { GetSession, CreateSession } from '../services/Session/SessionService';
import authMiddleware from '../middlewares/auth';
import usersRouter from './users.routes';

const routes = Router();

routes.post('/session', CreateSession);

routes.use(authMiddleware);

routes.get('/session', GetSession);

routes.use('/users', usersRouter);

export default routes;
