/**
 * Alternight JDB 2023
 * 
 * Função principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * uso: db.get('campo')
 * resposta: json do "campo" selecionado, caso não exista retorna "null"
 * 
 */ 
const {
    dateformat, dbMaker, decrypter,
    encrypter, fld, gnu, Keymaker,
    loadDB, log, saveDB, json
} = require('../internal')

function get(field) {
    const database = loadDB();
    if (field === 'all') {
        log(`Banco de dados foi desencriptado(get"ALL")`);
        return database;
    } else if (!database[field]) {
        log(`Field '${field}' não existe.`);
        return null;
    } else {
        log(`Field '${field}' foi desencriptado.`);
        return database[field]
    }
}
module.exports = { get }