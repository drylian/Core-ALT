const { loadDBFLD } = require('../functions/controller');
const { log } = require('../functions/logmanager');

function get(field, id = null) {
  const database = loadDBFLD();

  if (!database[field]) {
    log(`Field '${field}' não existe.`);
    return null;
  } else {
    if (id) {
      if (!database[field][id]) {
        log(`Field '${field}.${id}' não existe.`);
        return null;
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
