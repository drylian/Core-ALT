const pm2 = require('pm2');
// Rota para exibir o formulário de configuração do ecossistema do bot
async function uptime(BotName) {
	try {
		const startTime = await getStartTime(BotName);
		if (!startTime) {
			return 'Offline';
		}

		const currentTime = Date.now();
		const uptimeSeconds = Math.floor((currentTime - startTime) / 1000);
		const uptime = formatUptime(uptimeSeconds);

		return uptime;
	} catch (err) {
		console.error(`[ Bot - Manager > Uptime ] Erro ao obter o Uptime do bot "${BotName}":` + err);
		return 'Erro ao obter o tempo de atividade';
	}
}


async function getStartTime(BotName) {
	return new Promise((resolve, reject) => {
		pm2.describe(BotName, (err, description) => {
			if (err) {
				reject(err);
			} else {
				const startTime = description[0].pm2_env.created_at;
				resolve(new Date(startTime));
			}
		});
	});
}

// Função auxiliar para formatar o tempo de atividade em um formato legível
function formatUptime(uptimeSeconds) {
	const days = Math.floor(uptimeSeconds / (3600 * 24));
	const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
	const minutes = Math.floor((uptimeSeconds % 3600) / 60);
	const seconds = uptimeSeconds % 60;

	let uptime = '';
	if (days > 0) {
		uptime += `${days}d `;
	}
	uptime += `${hours}h ${minutes}m ${seconds}s`;

	return uptime;
}

module.exports = { uptime };