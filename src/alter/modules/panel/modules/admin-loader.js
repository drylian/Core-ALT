const ejs = require('ejs');
const { db } = require('../../system/quick');
const styleLoader = require('./style-loader');

async function adm(page, req, res, opcoes) {
	return new Promise(async (resolve) => {
		const { client } = require('../../discord/modules/client');

		db.config = await db.get('config');
		db.discord = await db.get('discord');

		// Prefix
		const currentStyle = styleLoader.init();
		const ListStyle = styleLoader.load();
		db.status = db.get('status');
		db.alert = db.get('alert');
		// Rota principal /admin
		const url = `${db.config.web_url}:${db.config.web_port}`;
		const filePath = `./src/panel/views/${page}.ejs`;

		// Mesclar as opções fornecidas com as opções padrão
		let valores = {};
		Object.assign(valores, {
			alert_system: db.alert,
			success: res.locals.success,
			error: res.locals.error,
			profile: req.user,
			config: db.config,
			user: client.user.tag,
			avatar: db.discord.client.avatarURL,
			urlloader: url,
			style: currentStyle,
			styleSet: ListStyle,
		}, opcoes);

		valores.async = true;

		resolve(loader(filePath, valores));
	});
}

async function loader(filePath, options, page) {
	try {
		const html = await ejs.renderFile(filePath, options);
		return html;
	} catch (error) {
		console.error(`[Panel - Admin ] Erro ao renderizar o (${page}): ${error}`);
		const currentStyle = styleLoader.init();
		const { client } = require('../../discord/modules/client');
		db.config = db.get('config');
		const url = `${db.config.web_url}:${db.config.web_port}`;
		const html = await ejs.renderFile('./src/panel/views/errors/500.ejs', {
			title: db.config.web_name,
			style: currentStyle,
			urlloader: url,
			avatar: client.user.avatarURL(),
			async: true,
		});
		return html;
	}
}

module.exports = { adm };
