import Sequelize, { Model } from 'sequelize';

//gera o hash da senha
import bcrypt from 'bcryptjs';
// define a clase users
class Users extends Model {
  // esse medtodo vai ser chamado automaticamente pelo sequelize
  static init(sequelize) {
    super.init(
      // colunas que vao ser inseridas pelo usuário. virtual n existe no banco de dados
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
    // intercepta a chamada e pede para antes de salvar, encriptar a senha
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
