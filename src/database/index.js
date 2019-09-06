import Sequelize from 'sequelize';
import configuracao_database from '../config/database';
import User from '../app/models/users';
import File from '../app/models/files';
import Appointments from '../app/models/appointments';

const models = [User, File, Appointments];
// define a classe database
class Database {
  constructor() {
    this.init();
  }

  // faz a conexao com a base de dados. é a variavel que é esperada no models do users.js
  init() {
    this.conection = new Sequelize(configuracao_database);
    models
      .map(model => model.init(this.conection))
      .map(model => model.associate && model.associate(this.conection.models));
  }
}

export default new Database();
