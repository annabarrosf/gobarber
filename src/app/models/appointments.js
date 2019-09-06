import Sequelize, { Model } from 'sequelize';

class Appointments extends Model {
  // esse medtodo vai ser chamado automaticamente pelo sequelize
  static init(sequelize) {
    super.init(
      // colunas que vao ser inseridas pelo usuário. virtual n existe no banco de dados
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user.id', as: 'user' });
    this.belongsTo(models.Users, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointments;
