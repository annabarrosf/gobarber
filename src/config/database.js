// configurar a maneira de exportar e importar
// tem que instalar postgressb pg e pg h-store
module.exports = {
  username: 'postgres',
  password: 'password',
  database: 'GoBarber',
  host: '127.0.0.1',
  dialect: 'postgres',

  // define o padrao de tabelas e colunas
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
