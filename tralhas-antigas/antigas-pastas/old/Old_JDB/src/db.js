/**
 * Alternight JDB 2023
 * 
 * Função principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * Carrega as configurações que serão usadas pelo "db".
 * 
 */ 
const { all } = require('./db/all');
const { set } = require('./db/set');
const { get } = require('./db/get');
const { del } = require('./db/del');
const { drop } = require('./db/drop');
const { exp } = require('./db/exp');
const { imp } = require('./db/old/imp');
const { find } = require('./db/find');


module.exports = {
	set,
	get,
	del,
	drop,
	exp,
	imp,
	all,
	find,
};