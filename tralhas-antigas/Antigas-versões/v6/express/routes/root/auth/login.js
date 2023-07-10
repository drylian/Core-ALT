const express = require('express');
const router = express.Router();
const { set, client } = require('alter');
const { AuthValite, AuthFormat } = require('../../../../../../../src/panel/security/auth');
const passport = require('passport');

router.get('/', AuthFormat, (req, res) => {
    res.render('login/login',{
        title: set.web_name,
        user:client.user.username,
        avatar:client.user.avatarURL()
    })
})

router.get('/api', AuthFormat, (req, res, next) => {
    passport.authenticate('discord', {
        successRedirect: isAdmin(req.user) ? '/admin' : '/client',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});


module.exports = router;
