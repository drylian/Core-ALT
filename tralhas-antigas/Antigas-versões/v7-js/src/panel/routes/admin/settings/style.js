const express = require('express');
const router = express.Router();
const { db } = require('alter');
const { adm } = require('alter/panel');

router.get('/settings/style', async (req, res) => {
	const html = await adm('admin/settings/style', req, res);
	res.send(html);
});

router.post('/settings/style', (req, res) => {
	try {
		db.set('style', { style: `${req.body.style}` });
		req.flash('success', 'Tema Atualizado!');
		res.redirect('/admin/settings');
	} catch {
		req.flash('error', 'Falha ao tentar atualizar o tema.');
		res.redirect('/admin/settings');
	}
});

module.exports = router;