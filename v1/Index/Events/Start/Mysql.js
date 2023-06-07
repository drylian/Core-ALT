const mysql = require('mysql2/promise');
const { config } = require('../../../Settings');
const Config = config;
const colors = require('colors');
const DatabaseLocal = require('../Database/Local.json');

module.exports = {
  name: 'ready',
  async run(client) {
    if (Config.Start.Mysql.Active === true) {
      console.log(`[ ${colors.cyan('Eventos')} ]  ${colors.green('Mysql')} Iniciando conexão com database externo...`);
      try {
  
        const connection = await mysql.createConnection({
          host: Config.Start.Mysql.Host,
          user: Config.Start.Mysql.Username,
          password: Config.Start.Mysql.Password,
          database: Config.Start.Mysql.Database,
          port: Config.Start.Mysql.Port
        });
  
        await connection.ping();
        console.log(`[ ${colors.cyan('Eventos')} ]  ${colors.green('Mysql')} Conectado ao banco de dados MySQL com sucesso.`);
  
      } catch (error) {
        console.error(`[ ${colors.cyan('Eventos')} ]  ${colors.red('Mysql')} Ocorreu um erro ao conectar ao banco de dados: ${error}`);
      }
    } else {
      console.log(`[ ${colors.cyan('Eventos')} ]  ${colors.red('Mysql')} desativado. Usando Database Interno.`);
    }
  }
};
