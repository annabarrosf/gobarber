import Sequelize, { Model } from 'sequelize';

class Files extends Model {
  // esse medtodo vai ser chamado automaticamente pelo sequelize
  static init(sequelize) {
    super.init(
      // colunas que vao ser inseridas pelo usuário. virtual n existe no banco de dados
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }
}

export default Files;
