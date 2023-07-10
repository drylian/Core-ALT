/**
 * Alternight JDB 2023
 * 
 * Função principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * uso: db.get('campo')
 * resposta: json do "campo" selecionado, caso não exista retorna "null"
 * 
 */
const { loadDB } = require('../functions/loadDB');
const { log } = require('../functions/logmanager');

function get(field) {
	const database = loadDB();
	if (!database[field]) {
		log(`Field '${field}' não existe.`);
		return null;
	} else {
		log(`Field '${field}' foi desencriptado.`);
		return database[field];
	}
}
module.exports = { get };