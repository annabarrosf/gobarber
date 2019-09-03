// para nao criar tudo na mão, pode usar o sequelize cli com o comando sequelize
// migration create

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      // definir os valores da tabela
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  // tem que retirar o sequelize do down
  down: queryInterface => {
    return queryInterface.dropTable('files');
  }
};
// depois de configurar rodar no terminal db:migrate que vai abrir a tabela no
// postbird.
