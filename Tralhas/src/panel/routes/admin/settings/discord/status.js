const express = require('express');
const { db } = require('alter');
const router = express.Router();

router.post('/settings/system/status', (req, res) => {
	try {
		db.set('status', {
			status: `${req.body.status}`,
			active: `${req.body.active}`,
			auto: `${req.body.auto}`
		});
		req.flash('success', 'Status do Sistema Atualizado!');
		res.redirect('/admin/settings');
	} catch (err) {
		console.error('[ Web ] Erro ao atualizar a status:', err);
		req.flash('error', 'Erro ao tentar atualizar status.');
		res.redirect('/admin/settings');
	}
});


module.exports = router;