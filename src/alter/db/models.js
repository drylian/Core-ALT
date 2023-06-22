function JDBM(db, log) {
    /*
     * Alternight JDB 2023
     *
     * Models do JDB, Serve para pre-carregar arquivos
     * dentro do DB, antes de adicionar qualquer conteudo,
     * para garantir que todo conteúdo seja lido corretamente;
     * 
     */

    if (!db.get('config')) {
        log(`"config" não existe, criando field...`)
        db.set('config', {
            bot_token: '',
            bot_client: '',
            bot_client_secret: '',
            bot_callback_url: '',
            web_name: '',
            web_port: '',
            web_url: '',
            web_admin_id: '',
        });
    }

    if (!db.get('tema')) {
        log(`"tema" não existe, criando field...`)
        db.set('tema', {
            tema: "default.css"
        });
    }

    if (!db.get('status')) {
        log(`"status" não existe, criando field...`)
        db.set('status', {
            on : "off",
            status: "",
            auto : "off",
            cron : "off",
            type : "Playing,Listening,Watching,Competing,Streaming"// Configuração padrão
        });
    }
}
module.exports = { JDBM }