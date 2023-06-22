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
const {
  dateformat, dbMaker, decrypter,
  encrypter, fld, gnu, Keymaker,
  loadDB, log, saveDB, json
} = require('../internal')

function set(field, data) {
  const database = loadDB();

  if (!database[field] || typeof database[field] !== 'object') {
    database[field] = {};
  }

  for (const key in data) {
    database[field][key] = data[key];
  }

  saveDB(database);
  log(`Field '${field}' atualizado`);
}
module.exports = { set }