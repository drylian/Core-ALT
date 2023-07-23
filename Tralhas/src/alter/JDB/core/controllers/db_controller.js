/**
 * Alternight JDB 2023
 * 
 * Controllador principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * Carrega as configurações que serão usadas pelo "db".
 * 
 */ 
const { set } = require('./db/set');
const { get } = require('./db/get');
const { find } = require('./db/find')


module.exports = {
	set,
	get,
	find,
};