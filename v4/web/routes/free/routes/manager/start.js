const express = require('express');
const router = express.Router();
const pm2 = require('pm2');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Rota para iniciar o bot
router.get('/start/:name', (req, res) => {
    const name = req.params.name;

    pm2.connect((err) => {
        if (err) {
            console.error(`[ Web - Manager ] Erro ao tentar conectar o PM2` + err);
            req.flash('error', `Erro ao se Conectar com o PM2`);
            res.redirect('/manager/list');
            return;
        }

        pm2.start(name, (err, app) => {
            if (err) {
                console.error(`[ Web - Manager ] Erro ao iniciar o bot "${name}":` +err);
                req.flash('error', `O bot "${name}" Obteve erro ao ser iniciado`);
                res.redirect('/manager/list');
                return;
            }

            pm2.disconnect();
            req.flash('success', `O bot "${name}" foi iniciado com sucesso`);
            res.redirect('/manager/list');
        });
    });
});

module.exports = router;