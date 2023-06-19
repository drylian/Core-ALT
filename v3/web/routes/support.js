const express = require('express');
const router = express.Router();
const { client, theme } = require('alter')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const themes = theme
const jsonfile = require('jsonfile')

router.get('/support', ensureAuthenticated,(req, res) => {
    var theme = jsonfile.readFileSync(themes);
    res.render('home/support',{
        profile:req.user,
        client:client,
        theme:theme
    })
})

module.exports = router;
