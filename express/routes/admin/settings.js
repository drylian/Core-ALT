const express = require('express');
const router = express.Router();
const { set, client, db } = require('alter')
const fs = require("fs");

// Prefix
const config = db.config;
const themes = db.theme;
const status = db.status;
router.get('/settings', (req, res) => {
    fs.readdir("./express/themes/", (err, files) => {
        res.render('admin/settings', {
            profile: req.user,
            title: set.web_name,
            user: client.user.tag,
            avatar: client.user.avatarURL(),
            theme: themes,
            status: status,
            /*settings novas*/
            client: client,
            config: config,
            themeName: files,
        })
    })
})

router.post('/settings/config', (req, res) => {
    try {
        db.config.set({
            bot_client: req.body.bot_client,
            bot_client_secret: req.body.bot_client_secret,
            bot_callback_url: req.body.bot_callback_url,
            bot_token: req.body.bot_token,
            web_admin_id: req.body.web_admin_id.split(','),
            web_name: req.body.web_name,
            web_url: req.body.web_url,
            web_port: req.body.web_port
        });

        req.flash('success', 'Configuração atualizada, reinicie o painel para que as novas atualizações tenham efeito!');
        res.redirect('/admin/settings');
    } catch (error) {
        // Tratamento do erro aqui
        console.error('[ Web ] Erro ao atualizar a configuração:', error);
        req.flash('error', 'Ocorreu um erro ao atualizar a configuração. Por favor, tente novamente.');
        res.redirect('/admin/settings');
    }
})

router.post('/settings/dashboard', (req, res) => {
    json.update('./set/system/theme.json', { theme: `${req.body.theme}` }).then(function (dat) {
        req.flash('success', 'Tema Atualizado!')
        res.redirect('/admin/settings')
    })
})

router.post('/settings/system/status', (req, res) => {
    try {
        db.status.set({
            status: `${req.body.status}`,
            active: `${req.body.active}`,
            auto: `${req.body.auto}`
        })
        req.flash('success', 'Status do Sistema Atualizado!')
        res.redirect('/admin/settings')
    } catch (err) {
        console.error('[ Web ] Erro ao atualizar a configuração:', err);
        req.flash('error', 'Erro ao tentar atualizar status.')
        res.redirect('/admin/settings')
    }
})

router.post('/settings/upload/theme', function (req, res) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return req.flash('error', `Nenhum arquivo foi carregado, tente novamente!`),
            res.redirect('/admin/settings')
    }
    if (!req.files.sampleFile.name.endsWith(".css")) {
        return req.flash('error', `Por favor, carregue apenas arquivos CSS!`),
            res.redirect('/admin/settings')
    }
    const path = './express/themes/' + req.files.sampleFile.name
    if (fs.existsSync(path)) {
        return req.flash('error', `Tema com esse nome já existe!`),
            res.redirect('/admin/settings')
    }

    sampleFile = req.files.sampleFile;
    uploadPath = './express/themes/' + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);

        req.flash('success', `Tema ${sampleFile.name} carregado com sucesso!`)
        res.redirect('/admin/settings')
    });
});

module.exports = router;
