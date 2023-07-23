const { log } = require('../controllers/logs_controller');
const { disconnect } = require('./disconnect');
const { connect } = require('./connect');
const { loadAllSQL } = require('./loadAllSQL');
const { LoadTableSQL } = require('./LoadTableSQL');

// Função para carregar o banco de dados
async function loadSQL(tableName) {
	try {
		const db = await connect();

		if (tableName === 'allfields') {
			const tables = await loadAllSQL(db);
			const mergedData = {};

			for (const table of tables) {
				const jsonData = await LoadTableSQL(table, db);
				mergedData[table] = jsonData;
			}

			await disconnect(db);
			return mergedData;
		} else {
			const jsonData = await LoadTableSQL(tableName, db);
			await disconnect(db);
			return jsonData;
		}
	} catch (error) {
		log(`Erro ao carregar o banco de dados: ${error.message} (SQLITE-CORE).`, '3');
		return "error";
	}
}
module.exports = { loadSQL };