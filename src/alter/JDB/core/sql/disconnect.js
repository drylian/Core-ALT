/**
 * Alternight JDB 2023
 * 
 * Controller de Logs
 * 
 * Uma dependencia principal do JDB, é o controlador de todas as logs que serão geradas do JDB
 * Responsavel por mostrar e armazenar cada uma dependendo do Nivel de acesso.
 * 
 */
const { log } = require('../controllers/logs_controller');
async function disconnect(db) {
	return new Promise((resolve, reject) => {
		db.close((err) => {
			if (err) {
				reject(err.message);
			}
			log('Desconectado do Banco de Dados (SQLite).', '3');
			resolve();
		});
	});
}
module.exports = { disconnect };