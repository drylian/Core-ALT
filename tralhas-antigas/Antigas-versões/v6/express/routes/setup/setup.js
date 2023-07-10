
const temp = require('../../../alter/modules/express/ttokens')
const { db } = require('../../../alter/modules/db/JDB')
const { client } = require('alter')

function SetupMode(router) {
    try {
        // Rota principal
        router.get(`/setup=${temp.setup}`, (req, res) => {
            const setup = temp.setup
            // Leitura do arquivo JSON
            const config = db.get('config')


            // Renderização da página com o arquivo JSON
            res.render('setup/setup', { config, setup });
        });

        // Rota para processar a solicitação POST do formulário
        router.post(`/setup=${temp.setup}/post`, (req, res) => {
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
        router.get(`/setup=${temp.setup}/inicializar`, (req, res) => {
            // Leitura do arquivo JSON
            const c = db.get('config')

            if (!c.bot_client || !c.bot_client_secret || !c.bot_callback_url || !c.bot_token || !c.web_admin_id || !c.web_name || !c.web_url || !c.web_port) {
                req.flash('error', 'Todas as configurações devem estar configuradas antes de tentar iniciar o servidor.')
                res.redirect(`/setup=${temp.setup}`);
            } else {
                try {
                    const { CloseSetup } = require('../../express')
                    CloseSetup()
                    req.flash('success', 'O setup foi finalizado com sucesso, Espero que goste da experiencia.')
                    return res.redirect(`/`);
                } catch (err) {
                    console.log(`[ SETUP ] Erro: ${err}`)
                    req.flash('error', 'Erro ao tentar reiniciar o servidor, veja as logs.')
                    // Redireciona de volta para a página principal após a atualização
                    return res.redirect(`/setup=${temp.setup}`);
                }

            }
        });
        const config = db.get('config')

        // Middleware para lidar com erro 500 (Internal Server Error)
        router.use(function (err, req, res, next) {
            console.error(err.stack);
            res.status(500).render('errors/500', {
                title: config.web_name ?? 'Servidor',
                avatar: client.user.avatarURL() ?? './'
            });
        });

        // Middleware para lidar com erro 404 (Página não encontrada)z
        router.get('*', (req, res) => {
            res.status(404).render('errors/404', {
                title: config.web_name ?? 'Servidor',
                avatar: client.user.avatarURL() ?? './'
            });
        });
    } catch (err) {
        console.log(`[ SETUP ] erro obtido: ${err}`)
    }
}

module.exports = { SetupMode }
