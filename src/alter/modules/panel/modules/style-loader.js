const fs = require('fs');
const path = require('path');
const { db } = require('../../system/quick');

const stylesDir = './src/panel/styles';

function load() {
	const themeFiles = [];

	// Lê todas as pastas em styles
	fs.readdirSync(stylesDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.forEach((dirent) => {
			const themePath = path.join(stylesDir, dirent.name, 'pacote.json');

			// Verifica se o arquivo pacote.json existe
			if (fs.existsSync(themePath)) {
				const themeData = fs.readFileSync(themePath, 'utf8');
				const themeConfig = JSON.parse(themeData);

				// Adiciona as informações do tema ao array
				themeFiles.push({
					nome: themeConfig.nome,
					descricao: themeConfig.descricao,
					icon: themeConfig.icon,
					pasta: themeConfig.pasta
				});
			}
		});

	return themeFiles;
}

function init() {
	// Carrega o tema atual
	const temaAtual = db.get('style');
	if(temaAtual.style === 'undefined') {
		db.set('style', { style:'default'});
		console.log('[ Tema ] Erro ao tentar carregar tema selecionado, retornando ao padrão.');
		const temaAtual = db.get('style');
		const themePath = path.join(stylesDir, temaAtual.style, 'pacote.json');
		const themeData = fs.readFileSync(themePath, 'utf8');
		const themeConfig = JSON.parse(themeData);
		return themeConfig;
	}
	if (temaAtual || temaAtual.style !== 'undefined') {
		const themePath = path.join(stylesDir, temaAtual.style, 'pacote.json');
		const themeData = fs.readFileSync(themePath, 'utf8');
		const themeConfig = JSON.parse(themeData);
		return themeConfig;
	} else {
		db.set('style', { style:'default'});
		console.log('[ Tema ] Erro ao tentar carregar tema selecionado, retornando ao padrão.');
		const temaAtual = db.get('style');
		const themePath = path.join(stylesDir, temaAtual.style, 'pacote.json');
		const themeData = fs.readFileSync(themePath, 'utf8');
		const themeConfig = JSON.parse(themeData);
		return themeConfig;
	}
}

module.exports = {
	load,
	init
};
