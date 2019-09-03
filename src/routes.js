// Router permite separar o roteamento do express em outro arquivo
import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddlewares from './app/Middlewares/auth';
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';

// declara a variavel routes para definir as rotas
const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

// exporta rota
export default routes;
