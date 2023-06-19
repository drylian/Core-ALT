const express = require('express');
const router = express.Router();
const pm2 = require('pm2');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Rota para instalar pacotes do package.json
router.get('/install/:name', (req, res) => {
    const name = req.params.name;

    exec(`cd ${name} && npm install`, (err, stdout) => {
        if (err) {
            console.error(`[ Web - Manager ] Erro ao tentar instalar os pacotes do bot "${name}":` + err);
            req.flash('error', `Não foi possivel Instalar os pacotes do bot "${name}"`);
            res.redirect('/manager/list');
            return;
        }

        req.flash('success', `Os pacotes do bot "${name}" foi instalado com sucesso.`);
        res.redirect('/manager/list');
    });
});

module.exports = router;