/**
 * Alternight JDB 2023
 * 
 * Função principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * uso: db.drop('campo')
 * resposta: o "campo" selecionado é deletado
 * 
 */
const {
    dateformat, dbMaker, decrypter,
    encrypter, fld, gnu, Keymaker,
    loadDB, log, saveDB, json
} = require('../internal')

function drop(field) {
    const database = loadDB();
    if (database[field]) {
        if (field in database) {
            delete database[field];
            saveDB(database);
            log(`field '${field}' deletado`);
            return true;
        }
    }
    return false;
}
module.exports = { drop }