/**
 * Alternight 2023
 * 
 * Controller de Logs
 * 
 * Uma dependencia principal do painel, responsavel por armazenar
 * e registrar as logs
 * 
 */

import { config } from './ConfigController.mjs'
import { DisplayCheck } from'./functions/DisplayCheck.mjs';
import { LogsCheck } from'./functions/LogsCheck.mjs';

function log(message, level , isError) {
	if (config.logs.settings.display === 'on') {
		DisplayCheck(config, level, message, isError);
	}
	if (config.logs.settings.register === 'on') {
		LogsCheck(config, level, message, isError);
	}
}

export { log };