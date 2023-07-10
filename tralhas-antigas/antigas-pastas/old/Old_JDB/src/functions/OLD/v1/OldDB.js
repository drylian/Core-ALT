/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, carrega o database descryptado
 * 
 * uso: dependencia, precisa de certas configurações para funcionar.
 * uso: console.log(loadDB)
 * 
 */
/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, salva algo no banco de dados.
 * 
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const { encrypter } = require('./encrypter');
const fs = require('fs');
const { decrypter } = require('./decrypter');
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

// Função para salvar o banco de dados no arquivo JSON
async function saveDBOLD(database) {
	const encryptedData = encrypter(JSON.stringify(database));
	const db = encryptedData.db;
	const key = encryptedData.key;

	// Lê o conteúdo atual do arquivo key.json (se existir)
	let keyConfig = {};
	if (fs.existsSync(keyPath)) {
		const keyFileContent = fs.readFileSync(keyPath, 'utf8');
		keyConfig = JSON.parse(keyFileContent);
	}

	keyConfig.key = key;
	const keyConfigJson = JSON.stringify(keyConfig, null, 2);

	fs.writeFileSync(keyPath, keyConfigJson);

	// Salva a parte criptografada do banco de dados
	fs.writeFileSync(dbPath, db);
}
module.exports = { loadDBOLD ,saveDBOLD};