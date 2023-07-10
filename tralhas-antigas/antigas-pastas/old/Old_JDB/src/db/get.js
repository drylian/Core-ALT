const { loadDB } = require('../functions/controller');
const { log } = require('../functions/logmanager');

function get(field, id = null) {
	const database = loadDB();

	if (!database[field]) {
		log(`Field '${field}' não existe.`);
		return {};
	} else {
		if (id) {
			if (!database[field][id]) {
				log(`Field '${field}.${id}' não existe.`);
				return {};
			} else {
				log(`Field '${field}.${id}' foi desencriptado.`);
				return database[field][id];
			}
		} else {
			log(`Retornando todo o Field '${field}'.`);
			return database[field];
		}
	}
}

module.exports = { get };
