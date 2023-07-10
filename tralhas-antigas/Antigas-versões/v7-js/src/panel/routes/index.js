const express = require('express');
const { db } = require('alter');
const { client } = require('alter/discord');
const router = express.Router();
const config = db.get('config');

// Rota principal /
router.get('/', (req, res) => {
	res.render('root/index', { 
		title: config.web_name,
		avatar:client.user.avatarURL()
	});
});

module.exports = router;