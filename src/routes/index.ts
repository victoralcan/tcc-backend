import { Router } from 'express';

import { GetSession, CreateSession } from '../services/Session/SessionService';
import authMiddleware from '../middlewares/auth';
import usersRouter from './users.routes';
import tablesRouter from './tables.routes';

const routes = Router();

routes.post('/session', CreateSession);

routes.use(authMiddleware);

routes.get('/session', GetSession);

routes.use('/users', usersRouter);

routes.use('/tables', tablesRouter);

export default routes;
