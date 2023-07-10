const fs = require('fs');
const path = require('path');
const config = require('../../../src/config');

function getinfo(uuid) {
	let applicationSelect;
	const data = `${config.botPath}/${uuid}/application.config`;

	const applicationData = data;

	// Verifica se o arquivo pacote.json existe
	if (fs.existsSync(applicationData)) {
		const applicationContent = fs.readFileSync(applicationData, 'utf8');
		dotenv.config({ path: applicationData });

		// Adiciona as informações do tema ao array
		applicationSelect.push({
			script:process.env.SCRIPT,
			descricao: process.env.descricao,
			icon: process.env.icon,
			pasta: process.env.pasta
		});
	} else {
		return 'Não foi possivel encontrar o application.json obrigatorio dessa aplicação.';
	}

	return applicationSelect;
}

module.exports = {
	getinfo
};
