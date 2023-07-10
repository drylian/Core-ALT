
const { exec } = require('child_process');

async function install(local) {
	return new Promise(async (resolve) => {
		exec(`cd ${local} && npm install`, (err, stdout) => {
			if (err) {
				console.error(`[ Bot - Manager ] Erro ao tentar instalar os pacotes do bot "${local}":` + err);
				resolve('error');
			}
			resolve(true);
		});
	});
}

module.exports = { install };