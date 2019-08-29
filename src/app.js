// importar o express do node_modules
import express from 'express';

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
  }

  routes() {
    this.server.use(routes);
  }
}
// esportar o server do app
module.exports = new App().server;
