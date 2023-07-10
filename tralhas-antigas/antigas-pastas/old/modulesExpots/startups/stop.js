const express = require('express');
const router = express.Router();
const pm2 = require('pm2');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Rota para listar os ecossistemas e status do bot
async function stop(BotName) {
	return new Promise(async (resolve) => {

		pm2.connect((err) => {
			if (err) {
				console.error('[ Bot - Manager ] Erro ao tentar conectar o PM2' + err);
				resolve('error');
				return;
			}

			pm2.stop(BotName, (err, app) => {
				if (err) {
					console.error(`[ Bot - Manager ] Erro ao tentar parar o bot: "${BotName}": ` + err);
					resolve('error');
					return;
				}

				pm2.disconnect();
				resolve(true);
			});
		});
	});
}

module.exports = { stop };