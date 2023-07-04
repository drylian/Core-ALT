/**
 * Alternight JDB 2023
 * 
 * Função auxiliar para logs, mostra a logs caso certas restrições sejam formatadas corretamente
 * 
 */
const colors = require('colors');
function DisplayCheck(config, level, message, isError) {
	// Verifica se o nível solicitado está dentro do limite definido por config.logs_display_level
	if (level <= config.logs_display_level) {
		if (!isError) {
			console.log(`[ ${colors.cyan('JDB')} lvl-${level} ] ` + colors.green(message));
		} else {
			console.log(`[ ${colors.cyan('JDB') + ' - ' + colors.red('ERRO')} lvl-${level} ] ` + colors.red(message));
		}
	}
	if (level === "0") {
		if (!isError) {
			console.log(`[ ${colors.cyan('JDB')} ] ` + colors.green(message));
		} else {
			console.log(`[ ${colors.cyan('JDB') + ' - ' + colors.red('ERRO')} ` + colors.red(message));
		}
	}
}
module.exports = { DisplayCheck };