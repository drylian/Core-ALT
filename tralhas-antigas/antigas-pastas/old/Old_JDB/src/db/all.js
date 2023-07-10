/**
 * Alternight JDB 2023
 * 
 * Função principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * uso: db.all()
 * resposta: json do database completo
 * 
 */
const { saveDB, loadDB } = require('../functions/controller');
const { log } = require('../functions/logmanager');

function all() {
	const database = loadDB();
	log('Banco de dados foi desencriptado completamente');
	return database;
}
module.exports = { all };