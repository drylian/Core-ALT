const express = require('express');
const router = express.Router();
const { db } = require('alter');
const set = db.get('config');
const bot = db.get('discord');
const { AuthFormat } = require('../../security/format');
const passport = require('passport');

router.get('/', AuthFormat, (req, res) => {
	res.render('login/login',{
		title: set.web_name,
		user:bot.client.username,
		avatar:bot.client.avatarURL
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
