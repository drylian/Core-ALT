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

function fulltimer() {
	const currentDate = new Date();
	const day = String(currentDate.getDate()).padStart(2, '0');
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const year = String(currentDate.getFullYear());
	const hours = String(currentDate.getHours()).padStart(2, '0');
	const minutes = String(currentDate.getMinutes()).padStart(2, '0');
	const seconds = String(currentDate.getSeconds()).padStart(2, '0');
	return `${day}_${month}_${year}_${hours}_${minutes}_${seconds}`;
}

export { dateformat, fulltimer };