/**
 * Alternight JDB 2023
 * 
 * Função auxiliar para logs, mostra a logs caso certas restrições sejam formatadas corretamente
 * 
 */
const { dateformat } = require('./dateformat');
const fs = require('fs');
const path = require('path');
const { UnlinkerLogs } = require('./UnlinkerLogs');
const folder = require('../../functions/folder');

function LogsCheck(config, level, message, isError) {
	// Verifica se o nível solicitado está dentro do limite definido por config.logs_display_level
	if (level <= config.logs_display_level) {
		const currentDate = dateformat();
		folder(config.JDB_logsPath + '/Logs')
		folder(config.JDB_logsPath + '/Errors')
		const LogsPath = path.join(config.JDB_logsPath, 'Logs', `${currentDate}.db_content.logs`);
		const ErrPath = path.join(config.JDB_logsPath, 'Errors', `${currentDate}.db_err_content.logs`);
		const Limit = config.logs_autodelete;
		fs.mkdirSync(config.JDB_logsPath, { recursive: true });

		let Directory;
		if (!isError) {
			fs.appendFileSync(LogsPath, `[ JDB-Logs ] ${message}\n`);
			Directory = path.join(config.JDB_logsPath, 'Logs');
		} else {
			fs.appendFileSync(ErrPath, `[ JDB-Erro ] ${message}\n`);
			Directory = path.join(config.JDB_logsPath, 'Errors');
		}
		if (config.logs_autodelete_active === 'on') {
			UnlinkerLogs(Directory, Limit);
		}
	}
}
module.exports = { LogsCheck };