const mysql = require('mysql2/promise');
const Config = require('../../Config/config.json');
const database = require('../Database/Database-Server');

module.exports = {
  name: 'ready',
  async run(client) {
    try {
      console.log('[ MYSQL ] Carregando...');

      const connection = await mysql.createConnection({
        host: Config.Iniciar.Mysql.host,
        user: Config.Iniciar.Mysql.username,
        password: Config.Iniciar.Mysql.password,
        database: Config.Iniciar.Mysql.database,
        port: Config.Iniciar.Mysql.port
      });

      await connection.ping();
      console.log('[ MYSQL ] Conectado ao banco de dados MySQL com sucesso.');
      client.db = connection;

      // criação das tabelas
      for (const table in database.tables) {
        const { name, columns } = database.tables[table];
        const [rows] = await connection.execute(`SHOW TABLES LIKE '${name}'`);

        if (rows.length === 0) {
          console.log(`[ MYSQL ] Tabela '${name}' não existe, criando...`);
          await connection.execute(`CREATE TABLE ${name} (${columns.map(column => `${column.name} ${column.type} ${column.notNull ? 'NOT NULL' : ''} ${column.default ? `DEFAULT ${column.default}` : ''}`).join(', ')})`);
        } else {
          console.log(`[ MYSQL ] Tabela '${name}' já existe.`);
        }
      }
    } catch (error) {
      console.error(`[ MYSQL ] Ocorreu um erro ao conectar ao banco de dados: ${error}`);
    }
  }
};
