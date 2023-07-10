const pm2 = require('pm2');

// Rota para listar os ecossistemas e status do bot
async function list() {
	return new Promise(async (resolve) => {
		pm2.list((err, processes) => {
			if (err) {
				console.error('[ Bot - Manager ] Erro ao tentar obter a lista de bots:' + err);
				resolve('error');
			}
			resolve(processes);
		});
	});
}

module.exports = { list };