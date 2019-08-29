import Sequelize from 'sequelize';
import configuracao_database from '../config/database';
import User from '../app/models/users';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.conection = new Sequelize(configuracao_database);
    models.map(model => model.init(this.conection));
  }
}

export default new Database();
