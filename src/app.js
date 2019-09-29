import 'dotenv/config';

// importar o express do node_modules
import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
// importar o routes do arquivo routes
import routes from './routes';
import sentryConfig from './config/sentry';

// impportar
import './database';
// define a classe app
class App {
  // inicia a classe
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHander();
  }

  middlewares() {
    // diz que a aplicação recebe requisições no formato json
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHander() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}
// exportar o server do app
module.exports = new App().server;
