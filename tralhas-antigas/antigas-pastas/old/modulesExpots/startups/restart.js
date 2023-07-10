const pm2 = require('pm2');

// Rota para listar os ecossistemas e status do bot
async function restart(BotName) {
	return new Promise(async (resolve) => {
		pm2.connect((err) => {
			if (err) {
				console.error('[ Bot - Manager ] Erro ao tentar conectar o PM2' + err);
				resolve('error');
				return;
			}

			pm2.restart(BotName, (err, app) => {
				if (err) {
					console.error(`[ Bot - Manager ] Erro ao tentar reiniciar o bot "${BotName}": ` + err);
					resolve('error');
					return;
				}

				pm2.disconnect();
				resolve(true);
			});
		});
	});
}
module.exports = { restart };