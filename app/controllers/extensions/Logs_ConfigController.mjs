import fs from 'fs';
import { json } from "../../modules/json.mjs"

function Logs_ConfigController(configPath) {
	const local = configPath.root + '/logs.json'
	let config = json(local);
	
	let NewConf = {};

	const regras = [
		{
			conf: 'register',
			condition: ['on', 'off'],
			padrao: 'off',
		},
		{
			conf: 'register_level',
			condition: ['1', '2', '3'],
			padrao: '1',
		},
		{
			conf: 'autodelete_active',
			condition: ['on', 'off'],
			padrao: 'on',
		},
		{
			conf: 'autodelete',
			condition: "number",
			padrao: '5',
		},
		{
			conf: 'display',
			condition: ['on', 'off'],
			padrao: 'off',
		},
		{
			conf: 'display_level',
			condition: ['1', '2', '3'],
			padrao: '1',
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

	const saveConf = JSON.stringify(NewConf, null, 2);
	fs.writeFileSync(local, saveConf);
	return NewConf
}

export { Logs_ConfigController };
