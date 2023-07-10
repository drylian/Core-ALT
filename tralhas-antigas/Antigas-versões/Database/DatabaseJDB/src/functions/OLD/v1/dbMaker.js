/**
 * Alternight JDB 2023
 * 
 * função principal, serve para salvar o banco de dados.
 * 
 * uso: dbMaker(./local/do/db)
 * 
 */
const { saveDB, loadDB } = require('../../controller');
const colors = require('colors');
const fs = require('fs');
const { dbPath } = require('../../../settings');
// Configuração do Banco de dados
async function dbMaker() {
	return new Promise((resolve) => {
		if (!fs.existsSync(dbPath)) {
			console.log(`[ ${colors.cyan('JDB')} ] Banco de dados não detectado, criando um novo.`);

			// Cria um novo banco de dados vazio
			saveDB({});

			console.log(`[ ${colors.cyan('JDB')} ] Banco de dados criado com sucesso.`);
		}
		resolve(true);
	});
}

module.exports = { dbMaker };