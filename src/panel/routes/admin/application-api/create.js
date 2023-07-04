const express = require('express');
const router = express.Router();
const { db, gec } = require('alter');
const { adm } = require('alter/panel');

// Rota para renderizar a página de criação de tokens
router.get('/application-api/create', async (req, res) => {
	const html = await adm('admin/application-api/create', req, res);
	res.send(html);
});

router.post('/application-api/create', (req, res) => {
	const { ident, desc } = req.body;
	const last_use = 'Não usada';
	const token = `core_${gec()}`;
	const create_at = new Date().toString();
	const clientAccess = req.body.clientAccess === 'on' || 'off';
	const adminAccess = req.body.adminAccess === 'on' || 'off';
	const rootAccess = req.body.rootAccess === 'on' || 'off';

	try {
		db.set('tokens', [{
			ident: ident,
			description:desc,
			token: token,
			last_use: last_use,
			create_at: create_at,
			client: clientAccess,
			admin: adminAccess,
			root: rootAccess,
		}], 'id');

		req.flash('success', 'O token foi criado com sucesso.');
		res.redirect('/admin/application-api');
	} catch (err) {
		console.log(`[ Panel ] Erro ao gerar token: ${err}`);
		req.flash('error', 'O token não pode ser gerado.');
		res.redirect('/admin/application-api');
	}
});
module.exports = router;