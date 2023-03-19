const mysql = require('mysql2/promise');
const config = require('../../config.json');
const database = require('../Data/database');

module.exports = {
  name: 'ready',
  async run(client) {
    try {
      console.log('[ MYSQL ] Carregando...');

      const connection = await mysql.createConnection({
        host: config.database.host,
        user: config.database.username,
        password: config.database.password,
        database: config.database.database,
        port: config.database.port
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
