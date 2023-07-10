const fs = require('fs');
const { encrypter } = require('../crypters/encrypter');
const { decrypter } = require('../crypters/decrypter');
const { encoder } = require('../crypters/encoder');
const { decoder } = require('../crypters/decoder');
const { dbPath } = require('../../settings');
 
// Função para salvar o banco de dados no arquivo JSON
function saveDBFLD(database) {
	// Salva cada "field" em um arquivo separado
	for (const field in database) {
		const fieldValue = database[field];
		const encodedField = encoder(field);
		const fieldPath = `${dbPath}/${encodedField}`;
		const encryptedData = encrypter(fieldValue);
		fs.writeFileSync(fieldPath, encryptedData);
	}
}

// Função para carregar o banco de dados do arquivo JSON
function loadDBFLD() {
	const database = {};

	// Carrega cada "field" de um arquivo separado
	const files = fs.readdirSync(dbPath);
	for (const file of files) {
		const decodedField = decoder(file);
		const filePath = `${dbPath}/${file}`;
		const fieldData = fs.readFileSync(filePath, 'utf8');
		const decryptedData = decrypter(fieldData);
		database[decodedField] = decryptedData;
	}

	return database;
}

// Função para carregar um campo específico do banco de dados do arquivo JSON
function loadField(field) {
	const encodedField = encoder(field);
	const filePath = `${dbPath}/${encodedField}`; // Alterado a extensão para '.db'
	if (!fs.existsSync(filePath)) {
		return null; // Campo não encontrado
	}
	const fieldData = fs.readFileSync(filePath, 'utf8');
	const decryptedData = decrypter(fieldData);
	return decryptedData;
}

module.exports = { saveDBFLD, loadDBFLD, loadField };
