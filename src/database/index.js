import Sequelize from 'sequelize';
import Mongoose from 'mongoose';
import configuracao_database from '../config/database';
import User from '../app/models/users';
import File from '../app/models/files';
import Appointments from '../app/models/appointments';

const models = [User, File, Appointments];
// define a classe database
class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // faz a conexao com a base de dados. é a variavel que é esperada no models do users.js
  init() {
    this.connection = new Sequelize(configuracao_database);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = Mongoose.connect(
      'mongodb://192.168.1.84:27017/gobarber2',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
