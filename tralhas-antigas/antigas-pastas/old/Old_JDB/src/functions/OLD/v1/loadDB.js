/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, carrega o database descryptado
 * 
 * uso: dependencia, precisa de certas configurações para funcionar.
 * uso: console.log(loadDB)
 * 
 */
const fs = require('fs');
const { decrypter } = require('../../decrypter');
const colors = require('colors');
const {dbPath, keyPath} = require('../../../settings');
// Função para carregar o banco de dados do arquivo JSON
async function loadDBOLD() {
	try {
		const db = fs.readFileSync(dbPath, 'utf8');
		const key = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));
		const encryptedData = {
			db: db,
			key: key.key
		};
		return JSON.parse(decrypter(encryptedData));
	} catch (error) {
		if (fs.existsSync(dbPath)) {
			console.error(`[ ${colors.cyan('JDB')} ] Erro ao ler banco de dados: ${colors.red(error)}`);
		}
		// Se o arquivo não existe ou está vazio, retorna um objeto vazio
		return {};
	}
}
module.exports = { loadDBOLD };