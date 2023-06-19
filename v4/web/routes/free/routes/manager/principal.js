const express = require('express');
const { db } = require('alter');
const router = express.Router();
const pm2 = require('pm2');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Rota para exibir o formulário de configuração do ecossistema do bot
router.get('/newbot', (req, res) => {
    const srcDirectory = './src';

    // Scan the "src" directory for bot folders
    fs.readdir(srcDirectory, (err, files) => {
        if (err) {
            console.error(`[ Web - Manager ] Erro ao tentar ler diretório bots:` + err);
            req.flash('error', `Não foi possivel obter o diretório bots"`);
            res.redirect('/admin/home');
            return;
        }

        // Filter out non-directory files
        const botFolders = files.filter((file) =>
            fs.statSync(path.join(srcDirectory, file)).isDirectory()
        );

        res.render('manager/newbot', { botFolders });
    });
});

// Rota para processar o envio do formulário de configuração e criar o ecossistema do bot
router.post('/newbot', (req, res) => {
    const botFolder = req.body.folder;
    const botScript = path.join('./src', botFolder, req.body.script);

    const newAppConfig = {
        name: req.body.name,
        script: botScript,
        // Adicione outras configurações conforme necessário
    };

    // Carregar as configurações existentes do banco de dados
    const existingConfig = db.bots.get('ecosystemConfig') || { apps: [] };

    // Verificar se já existe um aplicativo com o mesmo nome
    const isDuplicate = existingConfig.apps.some(app => app.name === newAppConfig.name);
    if (isDuplicate) {
        req.flash('error', 'Um bot com o mesmo nome já existe.');
        res.redirect('/manager/newbot');
        return;
    }

    existingConfig.apps.push(newAppConfig);

    // Salvar as configurações atualizadas no banco de dados
    db.bots.set('ecosystemConfig', existingConfig);

    // Cria o ecossistema usando o PM2
    pm2.connect((err) => {
        if (err) {
            console.error(`[ Web - Manager ] Erro ao tentar conectar o PM2` + err);
            req.flash('error', `Erro ao se Conectar com o PM2`);
            res.redirect('/manager/list');
            return;
        }

        pm2.start(ecosystemConfig, (err, apps) => {
            if (err) {
                console.error(`[ Web - Manager ] Erro ao iniciar o bot "${req.body.name}":` +err);
                req.flash('error', `O bot "${req.body.name}" Obteve erro ao ser iniciado`);
                res.redirect('/manager/list');
                return;
            }

            if (req.body.install === 'on') {
                // Install dependencies
                exec(`cd ./src/${botFolder} && npm install`, (err, stdout) => {
                    if (err) {
                        console.error(`[ Web - Manager ] Erro ao tentar instalar os pacotes do bot "${req.body.name}":` + err);
                        req.flash('error', `Não foi possivel Instalar os pacotes do bot "${req.body.name}"`);
                        res.redirect('/manager/list');
                        return;
                    }

                    pm2.disconnect();
                    res.redirect('/manager/list');
                });
            } else {
                pm2.disconnect();
                res.redirect('/manager/list');
            }
        });
    });
});

module.exports = router;