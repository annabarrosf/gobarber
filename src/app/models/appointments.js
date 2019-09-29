import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointments extends Model {
  // esse medtodo vai ser chamado automaticamente pelo sequelize
  static init(sequelize) {
    super.init(
      // colunas que vao ser inseridas pelo usuário. virtual n existe no banco de dados
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          }
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          }
        }
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
