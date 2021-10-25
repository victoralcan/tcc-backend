import { Router } from 'express';

import { GetSession, CreateSession } from '../services/Session/SessionService';
import authMiddleware from '../middlewares/auth';
import usersRouter from './users.routes';
import tablesRouter from './tables.routes';
import billsRouter from './bills.routes';
import ordersRouter from './orders.routes';
import orderItemRouter from './orders.routes';
import itemRouter from './item.routes';
import subCategoriesRoutes from './subCategories.routes';
import categoriesRoutes from './categories.routes';
import reservesRouter from './reserves.routes';
import rolesRoutes from './roles.routes';

const routes = Router();

routes.post('/session', CreateSession);

routes.use(authMiddleware);

routes.get('/session', GetSession);

routes.use('/users', usersRouter);

routes.use('/tables', tablesRouter);

routes.use('/bills', billsRouter);

routes.use('/orders', ordersRouter);

routes.use('/orderitem', orderItemRouter);

routes.use('/items', itemRouter);

routes.use('/subcategories', subCategoriesRoutes)

routes.use('/categories', categoriesRoutes);

routes.use('/reserve', reservesRouter);

routes.use('/roles', rolesRoutes);

export default routes;
