/**
 * Alternight JDB 2023
 * 
 * Controller de Logs
 * 
 * Uma dependencia principal do JDB, é o controlador de todas as logs que serão geradas do JDB
 * Responsavel por mostrar e armazenar cada uma dependendo do Nivel de acesso.
 * 
 */
const sqlite3 = require('sqlite3').verbose();
const { log } = require('../controllers/logs_controller');
async function connect() {
	const config = require('../../config.json');
	return new sqlite3.Database(config.JDB_dataPath + "/sql.sqlite", (err) => {
		if (err) {
			log(err.message, '1', true);
		}
		log('Conectado ao Banco de Dados (SQLite).', '3');
	});
}
module.exports = { connect };
