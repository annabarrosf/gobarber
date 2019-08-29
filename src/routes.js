// Router permite separar o roteamento do express em outro arquivo
import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// declara a variavel routes para definir as rotas
const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// exporta rota
export default routes;
