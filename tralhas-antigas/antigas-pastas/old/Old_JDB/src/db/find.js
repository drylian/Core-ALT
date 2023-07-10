const { saveDB, loadDB } = require('../functions/controller');
const { log } = require('../functions/logmanager');

function findRecursive(obj, search, path, results) {
	for (const key in obj) {
		const value = obj[key];
		const currentPath = path ? `${path}.${key}` : key;

		if (typeof value === 'object') {
			findRecursive(value, search, currentPath, results);
		} else if (typeof value === 'string' && value.includes(search)) {
			const [data_id, data_name] = currentPath.split('.');
			results.push({ value, path: currentPath, data_id, data_name });
		}
	}
}

async function find(field, search) {
	const database = loadDB(field);
	const results = [];

	if (!database[field]) {
		log(`Field '${field}' não existe.`);
		return false;
	}

	const fieldValue = database[field];

	findRecursive(fieldValue, search, '', results);

	if (results.length === 0) {
		log(`Nenhuma correspondência encontrada em '${field}' para '${search}'.`);
		return false;
	} else {
		log(`Correspondências encontradas em '${field}' para '${search}' abaixo.`);
		log(results);
	}

	return results;
}

module.exports = { find };
