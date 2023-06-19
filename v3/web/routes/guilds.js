const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const { client, themes } = require('alter')
import('dateformat')
const number = require('easy-number-formatter')
const jsonfile = require('jsonfile')

router.get('/guilds',ensureAuthenticated,(req,res) =>{
    var theme = jsonfile.readFileSync(themes);
    let guilds = client.guilds.cache.array()
    res.render('home/guilds',{
        guilds:guilds,
        profile:req.user,
        client:client,
        dateformat:dateformat,
        number:number,
        theme:theme
    })
})

router.post('/guilds/leave/:id', ensureAuthenticated,(req,res) =>{
    client.guilds.cache.get(req.params.id).leave().then(value => {
        req.flash('success', `Succesfully left guild "${value.name}"`)
        res.redirect('/guilds')
    })
})

module.exports = router;
