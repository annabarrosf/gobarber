import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
// define a clase users
class Users extends Model {
  // esse medtodo vai ser chamado automaticamente pelo sequelize
  static init(sequelize) {
    super.init(
      // colunas que vao ser inseridas pelo usuário
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Users;
