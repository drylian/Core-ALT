const express = require('express');
const router = express.Router();
const pm2 = require('pm2');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Rota para listar os ecossistemas e status do bot
router.get('/list', (req, res) => {
    pm2.list((err, processes) => {
        if (err) {
            console.error(`[ Web - Manager ] Erro ao tentar obter a lista de bots:` + err);
            req.flash('error', `Não foi possivel obter a lista de bots"`);
            res.redirect('/admin/home');
            return;
        }

        res.render('manager/list', { processes });
    });
});

module.exports = router;