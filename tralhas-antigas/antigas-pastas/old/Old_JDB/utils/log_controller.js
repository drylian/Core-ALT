const fs = require('fs');

/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, o sistema de logs do database
 * 
 * uso: log('mensagem')
 * resposta que vai receber: console.log('[ ${colors.cyan('JDB')} ] mensagem')
 * 
 */

const { dateformat } = require('../logs/functions/dateformat');
const path = require('path');
const colors = require('colors');

function log(message, isError, level) {
	const config = require('./settings');
	if (config.logs_display === 'on') {
		DisplayCheck(config, level, message, isError);
	}
	if (crypt.logs_register === 'on') {
		LogsCheck(config, level, message, isError);
	}
}

function DisplayCheck(config, level, message, isError) {
	// Verifica se o nível solicitado está dentro do limite definido por config.logs_display_level
	if (level <= config.logs_display_level) {
		if (!isError) {
			console.log(`[ ${colors.cyan('JDB')} ] ` + colors.green(message));
		} else {
			console.log(`[ ${colors.cyan('JDB') + ' - ' + colors.red('ERRO')} ] ` + colors.red(message));
		}
	}
}

function LogsCheck(config, level, message, isError) {
	// Verifica se o nível solicitado está dentro do limite definido por config.logs_display_level
	if (level <= config.logs_display_level) {
		const currentDate = dateformat();
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

		deleteOldestFileIfLimitExceeded(Directory, Limit);
	}
}

function deleteOldestFileIfLimitExceeded(directory, maxFiles) {
	const files = fs.readdirSync(directory);
  
	if (files.length >= maxFiles) {
	  const fileStats = files.map((file) => ({
			file,
			modifiedTime: fs.statSync(path.join(directory, file)).mtime.getTime(),
	  }));
  
	  fileStats.sort((a, b) => a.modifiedTime - b.modifiedTime);
  
	  const fileToDelete = path.join(directory, fileStats[0].file);
	  fs.unlinkSync(fileToDelete);
	}
}


module.exports = { log };