/**
* Alternight JDB 2023
* 
* função principal do JDB, serve para salvar as configurações no banco de dados
*  
* const data = { algo:"algo"}
* uso: saveSQL("field", data)
* 
*/
const { log } = require('../controllers/logs_controller');
const { disconnect } = require('./disconnect');
const { connect } = require('./connect');
const { AESencrypter } = require('../crypters/AESencrypter');
const { HEXdecoder } = require('../crypters/HEXdecoder');
const { AESdecrypter } = require('../crypters/AESdecrypter');
const { HEXencoder } = require('../crypters/HEXencoder');
// Função para salvar o banco de dados
async function saveSQL(tableName, data) {
	try {
		const db = await connect();

		return new Promise((resolve, reject) => {
			db.serialize(() => {
				// Verificar se a tabela já existe
				db.get(
					`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`,
					(err, row) => {
						if (err) {
							log(`Erro ao buscar a tabela "${tableName}" no banco de dados: ${err.message}`, '1', true);
							reject(err.message);
						} else {
							if (row) {
								// Tabela existe, mesclar dados antes de salvar
								db.get(`SELECT data FROM ${tableName}`, (err, row) => {
									if (err) {
										log(`Erro ao selecionar a tabela "${tableName}" no banco de dados: ${err.message}`, '1', true);
										reject(err.message);
									} else {
										const DecodedData = row ? HEXdecoder(row.data) : {};
										const existingData = row ? AESdecrypter(DecodedData) : {};
										const mergedData = Object.assign(existingData, data);
										const EncryptedData = AESencrypter(mergedData);
										const jsonData = HEXencoder(EncryptedData);
										console.log(jsonData);
										db.run(`UPDATE ${tableName} SET data = ?`, jsonData, function (err) {
											if (err) {
												log(`Erro ao atualizar a tabela "${tableName}" no banco de dados: ${err.message}`, '1', true);
												reject(err.message);
											} else {
												log(`A tabela "${tableName}" foi atualizada no banco de dados (SQLITE-CORE)`, '3');
												resolve();
											}
										});
									}
								});
							} else {
								// Tabela não existe, salvar dados
								const AESdata = AESencrypter(data);
								console.log(AESdata)
								const jsonData = HEXencoder(AESdata);
								db.run(`CREATE TABLE ${tableName} (data TEXT)`, (err) => {
									if (err) {
										log(`Erro ao criar a tabela "${tableName}" no banco de dados: ${err.message}`, '1', true);
										reject(err.message);
									} else {
										db.run(`INSERT INTO ${tableName} (data) VALUES (?)`, jsonData, function (
											err
										) {
											if (err) {
												log(`Erro ao salvar a tabela "${tableName}" no banco de dados: ${err.message}`, '1', true);
												reject(err.message);
											} else {
												log(`A tabela "${tableName}" foi criada e salva no banco de dados (SQLITE-CORE)`, '3');
												resolve();
											}
										});
									}
								});
							}
						}
					}
				);
			});
		}).then(() => {
			return disconnect(db);
		});
	} catch (error) {
		log(`Erro ao salvar o banco de dados: ${error.message}`, '1', true);
		return "error";
	}
}
module.exports = { saveSQL };