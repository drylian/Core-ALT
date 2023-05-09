const mysql = require('mysql2/promise');
const { config } = require('../../../Settings');
const Config = config;
const database = require('../Database/Database-Server');

module.exports = {
  name: 'ready',
  async run(client) {
    if (Config.Start.Mysql.Active === true) {
      console.log('[ MYSQL ] Database Ativo, Iniciando conexão...');
      try {
  
        const connection = await mysql.createConnection({
          host: Config.Start.Mysql.Host,
          user: Config.Start.Mysql.Username,
          password: Config.Start.Mysql.Password,
          database: Config.Start.Mysql.Database,
          port: Config.Start.Mysql.Port
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
    } else {
      console.log('[ MYSQL ] Database desativado, pulando codigo.');
    }
  }
};
