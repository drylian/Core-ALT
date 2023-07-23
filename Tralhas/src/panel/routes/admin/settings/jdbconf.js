const express = require('express');
const router = express.Router();
const { JDB, jsonsv, json } = require('alter');

router.post('/settings/jdbconf', async (req, res) => {
	try {
		const logs_display = req.body.jdb_config_logs_display === 'on' ? 'on' : 'off';
		const logs_active = req.body.jdb_config_logs === 'on' ? 'on' : 'off';

		const jdb_conf = json(JDB.ConfigPath); 
		// Salva as alterações no JSON
		jsonsv(JDB.ConfigPath, {
			key: jdb_conf.key,
			logs_display: logs_display,
			logs: logs_active
		});

		req.flash('success', 'As novas configurações do JDB entrarão em vigor!');
		res.redirect('/admin/settings');
	} catch (error) {
		console.error('[ ERRO - Panel ] Erro ao atualizar as configurações do JDB:', error);
		req.flash('error', 'Erro ao atualizar as configurações do JDB.');
		res.redirect('/admin/settings');
	}
});

module.exports = router;
