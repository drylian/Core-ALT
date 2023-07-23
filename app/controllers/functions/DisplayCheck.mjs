/**
 * Alternight 2023
 * 
 * Função auxiliar para logs, mostra a logs caso certas restrições sejam formatadas corretamente
 * 
 */
import colors from 'colors';
import moment from 'moment'

function DisplayCheck(config, level, message, isError) {
	if (!level) {
		if (!isError) {
			console.log(`| ${moment().format("HH:mm:ss")} | ${colors.cyan(config.title)} : ${message}`);
		} else {
			console.log(`| ${moment().format("HH:mm:ss")} | ${colors.cyan(config.title)} : ` + colors.red(message));
		}
	}
	// Verifica se o nível solicitado está dentro do limite definido por config.logs.logs_display_level
	if (level <= config.logs.settings.display_level) {
		if (!isError) {
			console.log(`| ${moment().format("HH:mm:ss")} lvl-${level} | ${colors.cyan(config.title)} : ${message}`);
		} else {
			console.log(`| ${moment().format("HH:mm:ss")} lvl-${level} | ${colors.cyan(config.title)} : ` + colors.red(message));
		}
	}
}
export { DisplayCheck };