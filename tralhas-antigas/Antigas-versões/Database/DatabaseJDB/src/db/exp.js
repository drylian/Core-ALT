/**
 * Alternight JDB 2023
 * 
 * Função principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * uso: db.exp('field','./local/do/arquivo.json')
 * resposta: exporta o json do "field" para fora do banco de dados,
 * pode ser usado para exportar dados para clientes
 * 
 */ 
const { saveDB, loadDB } = require('../functions/controller');
const { log } = require('../functions/logmanager');
const fs = require('fs');


function exp(field, filePath) {
	if (fs.existsSync(filePath)) {
		const jsonData = fs.readFileSync(filePath, 'utf-8');
		const loadData = JSON.parse(jsonData);
		if (!loadData) {
			log(`Erro: Formato JSON inválido para exportação do field '${field}'`);
			return false; // Invalid JSON format
		}
	}

	if (!filePath.endsWith('.json')) {
		log(`Erro: Formato de arquivo inválido para exportação do field '${field}'`);
		return false; // Invalid file format
	}

	const database = loadDB();
	if (field === 'all') {
		const data = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
		const tempo = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

		const exportData = {
			export: {
				name: `Banco de dados - Exportado do JDB`,
				description: 'Banco de dados do JDB exportado',
				data: data + ' - ' + tempo
			},
			data: database
		};
		const jsonData = JSON.stringify(exportData, null, 2);
		fs.writeFileSync(filePath, jsonData);
		log(`O Banco de dados foi exportado para o arquivo '${filePath}'`);
		return true;
	} else if (database[field]) {
		const data = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
		const tempo = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

		const exportData = {
			export: {
				name: `${field} - Exportada do JDB`,
				description: 'field exportado do JDB',
				data: data + ' - ' + tempo
			},
			data: database[field]
		};
		const jsonData = JSON.stringify(exportData, null, 2);
		fs.writeFileSync(filePath, jsonData);
		log(`field '${field}' exportado para o arquivo '${filePath}'`);
		return true;
	}
	return false;
}
module.exports = { exp };