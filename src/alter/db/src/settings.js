/**
 * Alternight 2023 JDB
 * 
 * Destinado a config interna do JDB.
 * 
 */
const { json, fld } = require('./internal')

// local é a pasta onde o database será armazenado
// logPath é para fins de log do jdb.
const local = './alter/db/data'
const logPath = './logs/'

fld(local)
const dbPath = local + '/JDB.db';
const keyPath = json(local + '/key.json');
const crypt = json(keyPath);
module.exports = { dbPath, keyPath, logPath ,crypt }