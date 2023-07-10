/**
 * Alternight JDB 2023
 * 
 * Controller de Logs
 * 
 * Uma dependencia principal do JDB, é o controlador de todas as logs que serão geradas do JDB
 * Responsavel por mostrar e armazenar cada uma dependendo do Nivel de acesso.
 * 
 */

const { DisplayCheck } = require('./src/DisplayCheck');
const { LogsCheck } = require('./src/LogsCheck');

function log(message, level , isError) {
	const config = require('../../config.json');
	if (config.logs_display === 'on') {
		DisplayCheck(config, level, message, isError);
	}
	if (config.logs_register === 'on') {
		LogsCheck(config, level, message, isError);
	}
}

module.exports = { log };