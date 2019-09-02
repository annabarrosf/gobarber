// Router permite separar o roteamento do express em outro arquivo
import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddlewares from './app/Middlewares/auth';

// declara a variavel routes para definir as rotas
const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);
routes.put('/users', UserController.update);

// exporta rota
export default routes;
