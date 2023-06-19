const { client, config } = require('alter');
const { loadSlashRest, loadSlashCommands } = require('./Handler/Slash')
const Enmap = require("enmap");
json = require('json-update');

client.config = config;
client.events = new Enmap();
client.prefix = new Enmap();
client.slash = new Enmap();

// Inicia o sistema de eventos
require(`./Handler/Events`)(client, config);

// Inicia o sistema de prefix
require(`./Handler/Prefix`)(client, config);

// Inicia os Slash
if (config.slashtype === 'guild'|| config.slashtype === 'normal') {
    loadSlashRest(client);
} else if (config.slashtype === 'direct') {
    loadSlashCommands(client);
} else {
    console.log('[ SlashType ] Tipo invalido, iniciando Rest(normal)')
    loadSlashRest(client);
}

// Loga o bot
client.login(config.token)
  .catch((err) => {
    console.error("[ CRASH ] Algo deu errado ao se conectar ao seu bot...");
    console.error("[ CRASH ] Erro da API do Discord:" + err);
    return process.exit();
  });

exports.client = client;