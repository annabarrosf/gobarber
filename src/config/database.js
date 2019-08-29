// configurar a maneira de exportar e importar

module.exports = {
  username: 'postgres',
  password: 'password',
  database: 'GoBarber',
  host: '127.0.0.1',
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
