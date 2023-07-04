
const { log } = require('../controllers/logs_controller');
const { HEXdecoder } = require('../crypters/HEXdecoder');
const { AESdecrypter } = require('../crypters/AESdecrypter');
// Função para obter o JSON armazenado em uma tabela específica
function LoadTableSQL(tableName, db) {
	const query = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`;

	return new Promise((resolve, reject) => {
		db.get(query, (err, row) => {
			if (err) {
				log(`Erro ao buscar a tabela "${tableName}" no banco de dados: ${err.message}`, '1', true);
				reject(err.message);
			} else if (row) {
				const getDataQuery = `SELECT data FROM ${tableName}`;
				db.get(getDataQuery, (err, row) => {
					if (err) {
						log(`Erro ao selecionar a tabela "${tableName}" no banco de dados: ${err.message}`, '1', true);
						reject(err.message);
					} else if (row && row.data) {
						const DecodedData = HEXdecoder(row.data);
						const decryptedData = AESdecrypter(DecodedData);
						log(`A tabela ${tableName} foi carregada (SQLITE-CORE).`, '3');
						resolve(decryptedData);
					} else {
						log(`A tabela ${tableName} está vazia (SQLITE-CORE).`, '3');
						resolve({});
					}
				});
			} else {
				log(`A tabela ${tableName} não existe (SQLITE-CORE).`, '3');
				resolve({});
			}
		});
	});
}
module.exports = { LoadTableSQL };