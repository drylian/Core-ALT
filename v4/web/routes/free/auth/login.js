const express = require('express');
const router = express.Router();
const { set, client } = require('alter');
const { ensureAuthenticated, forwardAuthenticated } = require('../../../auth/auth');
const passport = require('passport');

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('login/login',{
        title: set.web_name,
        user:client.user.username,
        avatar:client.user.avatarURL()
    })
})

router.get('/api', forwardAuthenticated,(req,res, next)=>{
    passport.authenticate('discord', {
        successRedirect: '/admin',
        failureRedirect: '/auth/login',
        failureFlash: true
      })(req, res, next);
})

module.exports = router;
