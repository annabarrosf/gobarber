// configurar a maneira de exportar e importar
// tem que instalar postgressb pg e pg h-store

require('dotenv/config').config();

module.exports = {
  username: process.env.DB_USE,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',

  // define o padrao de tabelas e colunas
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
