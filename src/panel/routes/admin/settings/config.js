const express = require('express');
const router = express.Router();
const { db } = require('alter');


router.post('/settings/config', (req, res) => {
	try {
		db.set('config',{
			bot_client: req.body.bot_client,
			bot_client_secret: req.body.bot_client_secret,
			bot_callback_url: req.body.bot_callback_url,
			bot_token: req.body.bot_token,
			web_admin_id: req.body.web_admin_id,
			web_name: req.body.web_name,
			web_url: req.body.web_url,
			web_port: req.body.web_port
		});

		req.flash('success', 'Configuração atualizada, reinicie o painel para que as novas atualizações tenham efeito!');
		res.redirect('/admin/settings');
	} catch (error) {
		// Tratamento do erro aqui
		console.error('[ Web ] Erro ao atualizar a configuração:', error);
		req.flash('error', 'Ocorreu um erro ao atualizar a configuração. Por favor, tente novamente.');
		res.redirect('/admin/settings');
	}
});

module.exports = router;