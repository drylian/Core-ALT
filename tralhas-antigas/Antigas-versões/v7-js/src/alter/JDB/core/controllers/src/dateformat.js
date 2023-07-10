/**
 * Alternight JDB 2023
 * 
 * Função auxiliar para formatar a data atual //LOGS//
 * 
 * uso: console.log(dateformat())
 * 
 */ 
function dateformat() {
	const currentDate = new Date();
	const day = String(currentDate.getDate()).padStart(2, '0');
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const year = String(currentDate.getFullYear());
	return `${day}-${month}-${year}`;
}
module.exports = { dateformat };