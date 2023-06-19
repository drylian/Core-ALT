const { db } = require('../db/JDB');
const colors = require('colors')

console.log(`[ ${colors.red('SYS')} ] Validando configurações antes da inicialização.`)

const fs = require('fs');
const configPath = "./config.json"

// Função para ler o arquivo de configuração
function readConfigFile() {
    try {
        const configData = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(configData);
        return config;
    } catch (error) {
        console.log(`[ ${colors.red('SYS')} ] Arquivo de configuração não encontrado`);
        return {};
    }
}

function log(nm, fld, p) {
    try {
        console.log(`[ ${colors.red('SYS')} ] "${nm}" mudou, setando... ${p}`)
    } catch {
        console.log(`[ ${colors.red('SYS -> ERRO')} ] ${colors.red(`Não foi possivel salvar o "${nm}" do "${fld}", verifique se o formato esta correto. (local:${configPath})... ${p}`)} `)
    }
}
// Verificação das configurações
function validateConfigurations() {
    const config = readConfigFile();

    console.log(`[ ${colors.red('SYS')} ] Verificando se a atualizações internas...`);

    if (config.bot_token && config.bot_token !== '') {
        log('bot_token', 'config', '12%')
        db.set('config', { bot_token: config.bot_token });
        config.bot_token = '';
    } else {
        console.log(`[ ${colors.red('SYS')} ] 12%`)
    }

    if (config.bot_client || config.bot_client !== '') {
        log('bot_client', 'config', '24%')
        db.set('config', { bot_client: config.bot_client });
        config.bot_client = '';
    } else {
        console.log(`[ ${colors.red('SYS')} ] 24%`)
    }

    if (config.bot_client_secret || config.bot_client_secret !== '') {
        log('bot_client_secret', 'config', '36%')
        db.set('config', { bot_client_secret: config.bot_client_secret });
        config.bot_client_secret = '';
    } else {
        console.log(`[ ${colors.red('SYS')} ] 36%`)
    }

    if (config.bot_callback_url || config.bot_callback_url !== '') {
        log('bot_callback_url', 'config', '48%')
        db.set('config', { bot_callback_url: config.bot_callback_url });
        config.bot_callback_url = '';
    } else {
        console.log(`[ ${colors.red('SYS')} ] 48%`)
    }

    if (config.web_name || config.web_name !== '') {
        log('web_name', 'config', '60%')
        db.set('config', { web_name: config.web_name });
        config.web_name = '';
    } else {
        console.log(`[ ${colors.red('SYS')} ] 60%`)
    }

    if (config.web_port || config.web_port !== '') {
        log('web_port', 'config', '72%')
        db.set('config', { web_port: config.web_port });
        config.web_port = '';
    } else {
        console.log(`[ ${colors.red('SYS')} ] 72%`)
    }

    if (config.web_url || config.web_url !== '') {
        log('web_url', 'config', '84%')
        db.set('config', { web_url: config.web_url });
        config.web_url = '';
    } else {
        console.log(`[ ${colors.red('SYS')} ] 84%`)
    }

    if (config.web_admin_id && Array.isArray(config.web_admin_id) && config.web_admin_id.length < 0) {
        log('web_admin_id', 'config', '96%')
        db.set('config', { web_admin_id: config.web_admin_id });
        config.web_admin_id = [];
    } else {
        console.log(`[ ${colors.red('SYS')} ] 96%`)
    }

    // Salva as alterações no arquivo de configuração
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`[ ${colors.red('SYS')} ] 100%`)

    console.log('[ SISTEMA ] Verificação concluída. Configurações atualizadas:');
}

// Chama a função para validar as configurações
validateConfigurations();
