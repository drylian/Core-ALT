/**
 * Alternight JDB 2023
 * 
 * Função principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * uso: db.set('campo', {
 *              valor:'algo'
 *          }
 *      )
 * 
 * resposta: cria/modifica um json com o "campo" selecionado 
 * 
 */ 
const { saveDB, loadDB } = require('../functions/controller');
const { saveDBFLD, loadDBFLD } = require('../functions/controller');
const { log } = require('../functions/logmanager');

function set(field, data, type) {
  const database = loadDBFLD();

  if (!database[field] || typeof database[field] !== 'object') {
    database[field] = {};
  }

  if (type === 'id') {
    if (!database[field].JDB_metadata) {
      database[field].JDB_metadata = {
        numeric_data: 1
      };
    } else {
      database[field].JDB_metadata.numeric_data += 1;
    }

    const newId = database[field].JDB_metadata.numeric_data;
    database[field][newId] = data;
  } else {
    for (const key in data) {
      database[field][key] = data[key];
    }
  }

  saveDBFLD(database);
  log(`Field '${field}' atualizado`);
}

module.exports = { set };
