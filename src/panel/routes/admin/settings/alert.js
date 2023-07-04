const express = require('express');
const router = express.Router();
const { db } = require('alter');
const { adm } = require('alter/panel');

router.get('/settings/alert', async (req, res) => {
	const alert = db.get('alert');
	const opt = {
		alert_system: alert
	};
	console.log(opt);

	const html = await adm('admin/settings/alert', req, res, opt);
	res.send(html);
});


router.post('/settings/alert', (req, res) => {
	const { message, color, backgroundColor } = req.body;
	try {
		const admin = req.body.admin === 'on' ? 'on' : 'off';
		const client = req.body.client === 'on' ? 'on' : 'off';
		const expires = req.body.expires === true ? req.body.expiresDate : 'off';
		db.set('alert', {
			message: message,
			color: color,
			backgroundColor: backgroundColor,
			admin: admin,
			client: client,
			expires: expires,
		});
		req.flash('success', 'Alerta atualizado!');
		res.redirect('/admin/settings/alert');
	} catch {
		req.flash('error', 'falha ao tentar atualizar o alerta.');
		res.redirect('/admin/settings/alert');
	}
});

module.exports = router;