const express = require('express');
const router = express.Router();
const { db } = require('alter');
const { adm } = require('alter/panel');
const { formatDistanceToNow } = require('date-fns');
const { ptBR } = require('date-fns/locale');

// Rota para renderizar a página de criação de tokens
router.get('/application-api', async (req, res) => {
	let tokens = null;

	try {
		tokens = db.get('tokens') ?? [];

		Object.keys(tokens).forEach(function (key) {
			if (key !== 'numeric_data') { // Ignorar o numeric_data
				const tokenList = tokens[key];
				tokenList.forEach(function (token) {
					token.create_at = formatDistanceToNow(new Date(token.create_at), { addSuffix: true, locale: ptBR });
				});
			}
		});

	} catch (err) {
		console.log(`[ Panel ] Erro ao obter lista de tokens: ${err}`);
		tokens = 'error';
	}
	const opt = {
		tokens
	};

	const html = await adm('admin/application-api/index', req, res, opt);
	res.send(html);
});

module.exports = router;