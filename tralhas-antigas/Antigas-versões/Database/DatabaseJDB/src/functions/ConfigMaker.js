/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve verificar/gerar o arquivo config.json
 * 
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const fs = require('fs');
const { gnu } = require('./gnu')
const { ConfigPath } = require('../settings');
const colors = require('colors');

async function ConfigMaker() {
	return new Promise((resolve) => {
		// Configuração de chave
		if (fs.existsSync(ConfigPath)) {
			const crypt = JSON.parse(fs.readFileSync(ConfigPath, 'utf-8'));

			if (!crypt.logs_display || !crypt.logs || !crypt.key) {
				const crypt = {
					key: gnu(1024),
					logs_display: 'off',
					logs: 'on'
				};

				const savepass = JSON.stringify(crypt, null, 2);
				fs.writeFileSync(ConfigPath, savepass);
				console.log(`[ ${colors.cyan('JDB')} ] Senha de criptografia criada com sucesso.`);
			} else {
				console.log(`[ ${colors.cyan('JDB')} ] Senha de criptografia encontrada.`);
			}
		} else {
			console.log(`[ ${colors.cyan('JDB')} ] Senha de criptografia não detectada, gerando uma nova.`);
			const crypt = {
				key: gnu(1024),
				logs_display: 'off',
				logs: 'off'
			};

			const savepass = JSON.stringify(crypt, null, 2);
			fs.writeFileSync(ConfigPath, savepass);
			console.log(`[ ${colors.cyan('JDB')} ] Senha de criptografia criada com sucesso.`);
		}
		resolve(true);
	});
}
module.exports = { ConfigMaker };