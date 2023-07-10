/**
 * Alternight JDB 2023
 * 
 * Função principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * uso: db.set('campo', {
 *              valor:'algo'
 *          }
 *      )
 * 
 * resposta: cria/modifica um json com o "campo" selecionado 
 * 
 */
const { saveDB } = require('../sql_controller');
const { log } = require('../logs_controller');

async function set(field, data, type) {
	try {
		const database = data
		if (!database || typeof database !== 'object') {
			database = {};
		}

		if (type === 'id') {
			if (database.JDB_metadata) {
				database.JDB_metadata = {
					numeric_data: 1
				};
			} else {
				database.JDB_metadata.numeric_data += 1;
			}

			const newId = database.JDB_metadata.numeric_data;
			database[newId] = data;
		} else {
			for (const key in data) {
				database[key] = data[key];
			}
		}
		console.log(database)

		await saveDB(field, database);
		log(`Field '${field}' atualizado`, '1');
		return true
	} catch (error) {
		log(`Erro ao atualizar o field '${field}': ${error.message}`, '1', true);
		return false
	}
}

module.exports = { set };
