/**
 * Alternight 2023 JDB
 * 
 * Destinado a config interna do JDB.
 * 
 * local é a pasta onde o database será armazenado
 * logPath é para fins de log do jdb.
 * 
 */

const local = './src/alter/db/data';
const logPath = './logs/';

const folder = require('./functions/folder');
const dbPath = local + '/DB_Files';
folder(dbPath);
const ConfigPath = local + '/config.json';

module.exports = { local, dbPath, logPath , ConfigPath };