/**
 * Alternight 2023
 * 
 * Função auxiliar para logs, mostra a logs caso certas restrições sejam formatadas corretamente
 * 
 */
import { dateformat } from './dateformat.mjs';
import fs from 'fs';
import path from 'path';
import { UnlinkerLogs } from './UnlinkerLogs.mjs';
import moment from 'moment';

function LogsCheck(config, level, message, isError) {
	if (!level) {
		const currentDate = dateformat();
		const LogsPath = path.join(config.logs.register, `${currentDate}.${config.title}.logs`);
		const ErrPath = path.join(config.logs.errors, `${currentDate}.${config.title}.logs`);
		const Limit = config.logs.settings.autodelete;

		let Directory;
		if (!isError) {
			fs.appendFileSync(LogsPath, `| ${moment().format("DD-MM-YYYY HH:mm:ss")} | ${config.title} : ${message}\n`);
			Directory = path.join(config.logs.register);
		} else {
			fs.appendFileSync(ErrPath, `| ${moment().format("DD-MM-YYYY HH:mm:ss")} | ${config.title} : ${message}\n`);
			Directory = path.join(config.logs.errors);
		}
		if (config.logs.settings.autodelete_active === 'on') {
			UnlinkerLogs(Directory, Limit);
		}
	}
	// Verifica se o nível solicitado está dentro do limite definido por config.logs.logs_display_level
	if (level <= config.logs.settings.register_level) {
		const currentDate = dateformat();
		const LogsPath = config.logs.register + `${currentDate}.db_content.logs`;
		const ErrPath = config.logs.errors + `${currentDate}.db_err_content.logs`;
		const Limit = config.logs.settings.autodelete;

		let Directory;
		if (!isError) {
			fs.appendFileSync(LogsPath, `| ${moment().format("DD-MM-YYYY HH:mm:ss")} | ${config.title} : ${message}\n`);
			Directory = path.join(config.logs.register);
		} else {
			fs.appendFileSync(ErrPath, `| ${moment().format("DD-MM-YYYY HH:mm:ss")} | ${config.title} : ${message}\n`);
			Directory = path.join(config.logs.errors);
		}
		if (config.logs.settings.autodelete_active === 'on') {
			UnlinkerLogs(Directory, Limit);
		}
	}
}
export { LogsCheck };