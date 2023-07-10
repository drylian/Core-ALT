/**
 * Alternight JDB 2023
 * 
 * Função principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * uso: db.dropall('Chave do database')
 * resposta: deleta o database, um backup é carregado quando deletado
 * 
 */ 
const { dateformat } = require('../functions/dateformat');
const { saveDB, loadDB } = require('../functions/controller');
const { log } = require('../functions/logmanager');
const { ConfigPath, dbPath } = require('../settings');
const fs = require('fs');
const json = require('../functions/json');
const crypt = json(ConfigPath);
function dropall(key) {
	const database = loadDB();
	const cryptKey = crypt.key;

	if (key === cryptKey) {
		const currentDate = dateformat();
		const backupFileName = `${currentDate}-backup-db.json`;
		const backupPath = `./${backupFileName}`;

		// Cria o backup do banco de dados desencriptado
		const backupData = {
			backup: {
				nome: 'Backup Automatico por dropAll - Alter JDB',
				descrição: 'Uma solicitação de deletar o banco de dados foi realizda,',
				timestamp: new Date().toString(),
			},
			data: database
		};

		const backupDataJson = JSON.stringify(backupData, null, 2);
		fs.writeFileSync(backupPath, backupDataJson);

		// Deleta o banco de dados atual
		fs.unlinkSync(dbPath);

		// Cria um novo banco de dados vazio
		saveDB({});

		log('Todo o banco de dados foi excluído', false);
		return true;
	} else {
		log('A chave fornecida não corresponde à chave do banco de dados', true);
		return false;
	}
}
module.exports = { dropall };