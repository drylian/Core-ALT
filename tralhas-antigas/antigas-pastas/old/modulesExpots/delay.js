// Função para aguardar um determinado tempo em milissegundos
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = { delay };