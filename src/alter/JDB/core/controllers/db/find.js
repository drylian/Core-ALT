const { loadDB } = require('../sql_controller');
const { log } = require('../logs_controller');

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
  return new Promise((resolve) => {
    const database = loadDB(); // Carrega o banco de dados inteiro

    try {
      const results = [];

      if (!database) {
        log('Banco de dados não existe.', '2');
        return {};
      }

      const fieldValue = database[field];
      findRecursive(fieldValue, search, field, results);

      if (results.length === 0) {
        log(`Nenhuma correspondência encontrada em '${field}' para '${search}'.`, '2');
        return {};
      } else {
        log(`Correspondências encontradas em '${field}' para '${search}' abaixo.`, '2');
      }

      resolve(results);
    } catch (err) {
      log(`Erro ao tentar efetuar busca (db-Controller > Find).`, '0', true);
    }
  });
}

module.exports = { find };
