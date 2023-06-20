const express = require('express');
const session = require('express-session');
const temp = require('../ttokens')
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const { db } = require('../../db/JDB')

const argv = require('yargs')
    .option('port', {
        alias: 'p',
        describe: 'Porta para o servidor.',
        type: 'number',
        default: 3000
    })
    .argv;

const port = argv.port
const app = express();

try {
    // Configuração do EJS
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views')
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
        session({
            secret: temp.session,
            resave: true,
            saveUninitialized: true
        })
    );

    app.use(flash());

    // Variantes Globais
    app.use(function (req, res, next) {
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
        next();
    });

    // Rota principal
    app.get(`/setup=${temp.setup}`, (req, res) => {
        const setup = temp.setup
        // Leitura do arquivo JSON
        const config = db.get('config')


        // Renderização da página com o arquivo JSON
        res.render('setup', { config, setup });
    });

    // Rota para processar a solicitação POST do formulário
    app.post(`/setup=${temp.setup}/post`, (req, res) => {
        try {
            if (
                !req.body.bot_client ||
                !req.body.bot_client_secret ||
                !req.body.bot_callback_url ||
                !req.body.bot_token ||
                !req.body.web_admin_id ||
                !req.body.web_name ||
                !req.body.web_url ||
                !req.body.web_port
            ) {
                req.flash('error', 'Todas as configurações devem estar configuradas antes de salvar.');
                return res.redirect(`/setup=${temp.setup}`);
            } else {
                db.set('config', {
                    bot_client: req.body.bot_client,
                    bot_client_secret: req.body.bot_client_secret,
                    bot_callback_url: req.body.bot_callback_url,
                    bot_token: req.body.bot_token,
                    web_admin_id: req.body.web_admin_id,
                    web_name: req.body.web_name,
                    web_url: req.body.web_url,
                    web_port: req.body.web_port
                });
            }
        } catch (err) {
            console.log('[ SETUP ] Erro: ' + err)
            req.flash('error', 'Ocorreu um erro ao tentar salvar o arquivo, tente novamente.')
            return res.redirect(`/setup=${temp.setup}`);
        }
        req.flash('success', 'Sucesso ao Salvar as configurações.')

        // Redireciona de volta para a página principal após a atualização
        res.redirect(`/setup=${temp.setup}`);
    });

    // Rota de iniciação
    app.get(`/setup=${temp.setup}/inicializar`, (req, res) => {
        // Leitura do arquivo JSON
        const c = db.get('config')

        if (!c.bot_client || !c.bot_client_secret || !c.bot_callback_url || !c.bot_token || !c.web_admin_id || !c.web_name || !c.web_url || !c.web_port) {
            req.flash('error', 'Todas as configurações devem estar configuradas antes de tentar iniciar o servidor.')
            res.redirect(`/setup=${temp.setup}`);
        } else {
            try {
                const { StopWebSetup } = require('../../startup/start-type/SetupServer')
                StopWebSetup()
            } catch (err) {
                console.log(`[ SETUP ] Erro: ${err}`)
                req.flash('error', 'Erro ao tentar reiniciar o servidor, veja as logs.')
                // Redireciona de volta para a página principal após a atualização
                return res.redirect(`/setup=${temp.setup}`);
            }

        }
    });

    app.listen(port, () => {
        console.log(`
        Servidor ativado com Setup, acesse o link especialmente criado abaixo para o servidor.

        Servidor: Em Modo de configurações
        link: http://localhost:${port}/setup=${temp.setup}

        Por favor, acesse o link acima para poder configurar seu servidor`
        )
    });
} catch (err) {
    console.log(`[ SETUP ] erro obtido: ${err}`)
}
