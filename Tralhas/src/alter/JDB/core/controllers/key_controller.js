/**
 * Alternight JDB 2023
 * 
 * Controller de Chave do SQLite
 * 
 * Uma dependencia principal do JDB, gerencia/cria o sistema de configurações
 * do JDB,que será usado para carregar/criar/gerneciar/cryptar e manipular todo
 * o sistema, isso é uma dependencia independente, cuja a unica função é preparar
 * o melhor ambiente para as configurações do JDB antes da verdadeira iniciação.
 * 
 */

const fs = require('fs');
const { gnu } = require('../controllers/src/gnu');
const colors = require('colors');
const path = require('path');

function KeyController() {
	return new Promise((resolve) => {
		const local = path.join(__dirname, '../../config.json');
		// Configuração de chave
		if (fs.existsSync(local)) {
			CheckConf(local);
			console.log(`[ ${colors.cyan('JDB')} ] Configurações atualizadas com sucesso.`);
		} else {
			console.log(`[ ${colors.cyan('JDB')} ] Arquivo de configuração não encontrado. Gerando um novo arquivo de configuração.`);
			if (fs.existsSync(local)) {
				const IsNew = true;
				CheckConf(local, IsNew);
			}
			console.log(`[ ${colors.cyan('JDB')} ] Arquivo de configuração criado com sucesso.`);
		}
		resolve(true);
	});
}

async function CheckConf(local, IsNew) {
	let config = {};

	if (!IsNew) {
		config = JSON.parse(fs.readFileSync(local, 'utf-8'));
	}

	let NewConf = {};

	const regras = [
		{
			conf: 'key',
		},
		{
			conf: 'logs_register',
			condition: ['on', 'off'],
			padrao: 'off',
		},
		{
			conf: 'logs_register_level',
			condition: ['1', '2', '3'],
			padrao: '1',
		},
		{
			conf: 'logs_autodelete_active',
			condition: ['on', 'off'],
			padrao: 'on',
		},
		{
			conf: 'logs_autodelete',
			condition: "number",
			padrao: '5',
		},
		{
			conf: 'logs_display',
			condition: ['on', 'off'],
			padrao: 'off',
		},
		{
			conf: 'logs_display_level',
			condition: ['1', '2', '3'],
			padrao: '1',
		},
		{
			conf: 'JDB_dataPath',
			padrao: './src/alter/JDB/SQL',
		},
		{
			conf: 'JDB_logsPath',
			padrao: './logs/JDB_Logs',
		},
		{
			conf: 'Save_minCount',
			condition: "number",
			padrao: '1',
		},
		{
			conf: 'Save_maxCount',
			condition: "number",
			padrao: '5',
		},
		{
			conf: 'Load_minCount',
			condition: "number",
			padrao: '5',
		},
		{
			conf: 'Load_maxCount',
			condition: "number",
			padrao: '25',
		},
	];

	regras.forEach(regra => {
		const { conf, condition, padrao } = regra;
		if (!config[conf]) {
			NewConf[conf] = padrao || '';
		} else if (condition) {
			// Verificar condições especiais
			if (condition === "number" && typeof config[conf] !== "number") {
				NewConf[conf] = padrao || '';
			} else if (!condition.includes(config[conf])) {
				NewConf[conf] = padrao || '';
			} else {
				NewConf[conf] = config[conf];
			}
		} else {
			NewConf[conf] = config[conf];
		}
	});

	if (!config.key) {
		NewConf.key = gnu(1024);
	}

	const saveConf = JSON.stringify(NewConf, null, 2);
	fs.writeFileSync(local, saveConf);
	/** Cria pastas necessarias */
	ConfigCreate()
}

function ConfigCreate() {
	const folder = require('../functions/folder');
	const config = require('../../config.json');
	folder(config.JDB_dataPath)
	folder(config.JDB_logsPath)
}

module.exports = { KeyController };
