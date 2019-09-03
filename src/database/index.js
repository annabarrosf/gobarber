import Sequelize from 'sequelize';
import configuracao_database from '../config/database';
import User from '../app/models/users';
import File from '../app/models/files';

const models = [User, File];
// define a classe database
class Database {
  constructor() {
    this.init();
  }

  // faz a conecçao com a base de dados. é a variavel que é esperada no models do users.js
  init() {
    this.conection = new Sequelize(configuracao_database);
    models.map(model => model.init(this.conection));
  }
}

export default new Database();
