const express = require('express');
const router = express.Router();
const { db } = require('alter');
const { AuthFormat } = require('../../security/format');
const passport = require('passport');

router.get('/', AuthFormat, async (req, res) => {
	const set = await db.get('config');
	const bot = await db.get('discord');
	res.render('login/login', {
		title: set.web_name,
		user: bot.client.username,
		avatar: bot.client.avatarURL
	});
});

router.get('/api', AuthFormat, (req, res, next) => {
	passport.authenticate('discord', {
		successRedirect: '/auth/login/redirect',
		failureRedirect: '/auth/login',
		failureFlash: true
	})(req, res, next);
});

module.exports = router;
