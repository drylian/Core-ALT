/**
 * Alternight JDB 2023
 * 
 * Função principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * uso: db.del('campo', {
 *              valor:'algo'
 *          }
 *      )
 * 
 * resposta: deleta um valor dentro do json do "campo" selecionado 
 * 
 */


const { saveDB, loadDB } = require('../functions/controller');
const { log } = require('../functions/logmanager');

function del(field, key) {
	const database = loadDB();
	if (database[field] && typeof database[field] === 'object') {
		const keys = key.split(':').map((k) => k.trim());
		const lastKey = keys.pop();
		let obj = database[field];
		for (const k of keys) {
			if (obj[k] && typeof obj[k] === 'object') {
				obj = obj[k];
			} else {
				return false;
			}
		}
		if (lastKey in obj) {
			delete obj[lastKey];
			saveDB(database);
			log(`Key '${key}' deletada do campo '${field}'`);
			return true;
		}
	}
	return false;
}
module.exports = { del };