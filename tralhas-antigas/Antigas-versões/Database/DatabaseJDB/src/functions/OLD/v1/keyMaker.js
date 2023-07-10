/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve verificar/gerar o arquivo key.json
 * 
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const fs = require('fs');
const { keyPath } = require('../settings');
const { gnu } = require('./gnu');
const colors = require('colors');

async function KeyMaker() {
	return new Promise((resolve) => {
		// Configuração de chave
		if (fs.existsSync(keyPath)) {
			const crypt = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));

			if (!crypt.pass) {
				const crypt = {
					key: 'NotGerate',
					pass: gnu(32),
					logs_display: 'off',
					logs: 'on'
				};

				const savepass = JSON.stringify(crypt, null, 2);
				fs.writeFileSync(keyPath, savepass);
				console.log(`[ ${colors.cyan('JDB')} ] Senha de criptografia criada com sucesso.`);
			} else {
				console.log(`[ ${colors.cyan('JDB')} ] Senha de criptografia encontrada.`);
			}
		} else {
			console.log(`[ ${colors.cyan('JDB')} ] Senha de criptografia não detectada, gerando uma nova.`);

			const crypt = {
				key: 'NotGerate',
				pass: gnu(32),
				logs_display: 'off',
				logs: 'on'
			};

			const savepass = JSON.stringify(crypt, null, 2);
			fs.writeFileSync(keyPath, savepass);
			console.log(`[ ${colors.cyan('JDB')} ] Senha de criptografia criada com sucesso.`);
		}
		resolve(true);
	});
}
module.exports = { KeyMaker };