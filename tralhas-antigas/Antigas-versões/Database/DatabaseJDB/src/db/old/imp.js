/**
 * Alternight JDB 2023
 * 
 * Função principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * uso: db.emp imp('nome do campo', 'local/do/arquivo.json')
 * 
 * resposta: importa um json externo para dentro do banco de dados,o arquivo vai ficar no "campo" selecionado
 * 
 */ 
const { saveDB, loadDB, loadField } = require('../../functions/controller');
const { log } = require('../../functions/logmanager');
const fs = require('fs');

function imp(field, filePath) {
	if (!filePath.endsWith('.json')) {
		log(`Erro: Formato de arquivo inválido para importação no campo '${field}'`);
		return false; // Invalid file format
	}

	try {
		const jsonData = fs.readFileSync(filePath, 'utf-8');
		const importedData = JSON.parse(jsonData);
		if (!importedData) {
			log(`Erro: Formato JSON inválido para importação no campo '${field}'`);
			return false; // Invalid JSON format
		}

		const database = loadField(field);
		console.log(database)
		database[field] = importedData.data;
		saveDB(database);
		log(`Campo '${field}' importado do arquivo '${filePath}'`);
		return true;
	} catch (error) {
		log(`Erro: Falha ao importar o campo '${field}' do arquivo '${filePath}' erro:` + error, error);
		return false;
	}
}
module.exports = { imp };