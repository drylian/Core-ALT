const mysql = require('mysql2/promise');
const { config } = require('../../../Settings');
const Config = config;
const colors = require('colors');
const DatabaseServer = require('../Database/Database-Server');
const DatabaseLocal = require('../Database/Database-Local.json');
const DatabaseCorrente = require('../Database/Database-Corrente.json');

module.exports = {
  name: 'ready',
  async run(client) {
    if (Config.Start.Mysql.Active === true) {
      console.log(`[ ${colors.cyan('EVENTOS')} ]  ${colors.green('Mysql')} Iniciando conexão com database externo...`);
      try {
  
        const connection = await mysql.createConnection({
          host: Config.Start.Mysql.Host,
          user: Config.Start.Mysql.Username,
          password: Config.Start.Mysql.Password,
          database: Config.Start.Mysql.Database,
          port: Config.Start.Mysql.Port
        });
  
        await connection.ping();
        console.log(`[ ${colors.cyan('EVENTOS')} ]  ${colors.green('Mysql')} Conectado ao banco de dados MySQL com sucesso.`);
        client.db = connection;
  
        // criação das tabelas
        for (const table in DatabaseServer.tables) {
          const { name, columns } = DatabaseServer.tables[table];
          const [rows] = await connection.execute(`SHOW TABLES LIKE '${name}'`);
  
          if (rows.length === 0) {
            console.log(`[ ${colors.cyan('EVENTOS')} ]  ${colors.yellow('Mysql')} '${name}' não existe, criando...`);
            await connection.execute(`CREATE TABLE ${name} (${columns.map(column => `${column.name} ${column.type} ${column.notNull ? 'NOT NULL' : ''} ${column.default ? `DEFAULT ${column.default}` : ''}`).join(', ')})`);
          } else {
            console.log(`[ ${colors.cyan('EVENTOS')} ]  ${colors.green('Mysql')}  Tabela '${name}' já existe.`);
          }
        }
      } catch (error) {
        console.error(`[ ${colors.cyan('EVENTOS')} ]  ${colors.red('Mysql')} Ocorreu um erro ao conectar ao banco de dados: ${error}`);
      }
    } else {
      console.log(`[ ${colors.cyan('EVENTOS')} ]  ${colors.red('Mysql')} desativado. Usando Database Interno.`);
    }
  }
};
