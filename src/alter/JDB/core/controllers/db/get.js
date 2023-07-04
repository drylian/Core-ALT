const { loadDB } = require('../sql_controller');
const { log } = require('../logs_controller');

async function get(field, id = null) {
	return new Promise((resolve) => {
		const database = loadDB(field);
		try {
			if (!database) {
				log(`Field '${field}' não existe.`, "2");
				return {};
			} else {
				if (id) {
					if (!database[id]) {
						log(`Field '${field}.${id}' não existe.`, "2");
						return {};
					} else {
						log(`Field '${field}.${id}' foi desencriptado.`, "2");
						return database[id];
					}
				} else {
					log(`Retornando o field '${field}'.`, "2");
					resolve(database);
				}
			}
		} catch {
			log(`Erro ao tentar carregar o field '${field}'.`, "0");
			resolve({error:"Falha ao carregar dados"});
		}
	})
}

module.exports = { get };