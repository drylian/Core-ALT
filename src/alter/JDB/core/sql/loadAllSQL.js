const { log } = require('../controllers/logs_controller');

// Função para obter todas as tabelas do banco de dados
function loadAllSQL(db) {
	return new Promise((resolve, reject) => {
		db.all('SELECT name FROM sqlite_master WHERE type=\'table\'', (err, rows) => {
			if (err) {
				log(`Erro ao carregar todas as tabelas do banco de dados (SQLITE-CORE):${err.message}.`, '1', true);
				reject(err.message);
			} else {
				const tables = rows.map((row) => row.name);
				log('Todas as tables foram carregadas (SQLITE-CORE).', '3');
				resolve(tables);
			}
		});
	});
}
module.exports = { loadAllSQL };