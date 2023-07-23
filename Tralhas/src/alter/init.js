const express = require('express');
const { valideConf } = require('../terminal/modules/setup');
const { discordInit } = require('../discord/discord');
const { panelInit } = require('../panel/panel');
const { delay } = require('alter');
const colors = require('colors');

const app = express();

async function init() {
	try {
		// Valida a configuração do painel antes de iniciar qualquer coisa
		await valideConf();

		// Inicia o bot do painel
		await discordInit();

		/**
		 * tempo para o bot se conectar com sucesso ao discord, não é necessario,
		 * porem pode evitar muitos erros gerados pela demora do "client" se conectar
		 * aos servidores vindos por parte do discord.
		 */

		await delay(10000);

		// Inicia o painel principal
		const port = await panelInit(app);

		app.listen(port, () => {
			console.log(`[ ${colors.cyan('Core')} ] Servidor iniciado na porta ${port}`);
		});

	} catch (err) {
		console.error(`[ ${colors.cyan('Core')} ] Erro ao tentar iniciar: ${colors.red(err)}`);
	}
}

init();