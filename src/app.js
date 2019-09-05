// importar o express do node_modules
import express from 'express';
import path from 'path';
// importar o routes do arquivo routes
import routes from './routes';
// impportar
import './database';
// define a classe app
class App {
  // inicia a classe
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // diz que a aplicação recebe requisições no formato json
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}
// exportar o server do app
module.exports = new App().server;
