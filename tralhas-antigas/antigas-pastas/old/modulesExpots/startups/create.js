const { Client, Intents } = require('discord.js');
const { exec } = require('child_process');
const { json, jsonsv } = require('../json');
const { db } = require('../quick');
const path = require('path');
const pm2 = require('pm2');

async function create(BotOpt) {
	const botFolder = BotOpt.botFolder;
	const botScript = BotOpt.botScript;

	const newAppConfig = {
		name: BotOpt.BotName,
		script: botScript,
		// Adicione outras configurações conforme necessário
	};

	// Carregar as configurações existentes do banco de dados
	const existingConfig = await db.get('ecosystemConfig') || { apps: [] };

	// Verificar se já existe um aplicativo com o mesmo nome
	const isDuplicate = existingConfig.apps.some(app => app.name === newAppConfig.name);
	if (isDuplicate) {
		return 'Um bot com o mesmo nome já existe.';
	}

	existingConfig.apps.push(newAppConfig);

	// Salvar as configurações atualizadas no banco de dados
	await db.set('ecosystemConfig', existingConfig);

	// Cria o ecossistema usando o PM2
	pm2.connect((err) => {
		if (err) {
			console.error(`Erro ao tentar conectar o PM2: ${err}`);
			return 'Erro ao se Conectar com o PM2';
		}

		pm2.start(newAppConfig, (err, apps) => {
			if (err) {
				console.error(`Erro ao iniciar o bot "${newAppConfig.name}": ${err}`);
				return `O bot "${newAppConfig.name}" Obteve erro ao ser iniciado`;
			}

			// Install dependencies
			exec(`cd ${botFolder} && npm install`, (err, stdout) => {
				if (err) {
					console.error(`Erro ao tentar instalar os pacotes do bot "${newAppConfig.name}": ${err}`);
					return `Não foi possivel Instalar os pacotes do bot "${newAppConfig.name}"`;
				}

				pm2.disconnect();
                
				return 'Instalação concluída!';
			});
		});
	});
}
module.exports = { create };

