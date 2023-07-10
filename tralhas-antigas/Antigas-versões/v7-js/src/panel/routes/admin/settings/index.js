const express = require('express');
const router = express.Router();
const { adm } = require('alter/panel');
const { JDB,json } = require('alter');

router.get('/settings', async (req, res) => {
	const jdb_config = await json(JDB.ConfigPath);
	const opt = {
		jdb_config:jdb_config
	};
	console.log(opt);

	const html = await adm('admin/settings/index', req, res, opt);
	res.send(html);
});

module.exports = router;
