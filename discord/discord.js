const { Collection } = require('discord.js');
const { client, config, set } = require('alter');
const { loadSlashRest, loadSlashCommands } = require("./Handler/Slash")
json = require('json-update');

// Inicia os Collections
client.config = set;
client.events = new Collection();
client.slash = new Collection();

// Inicia o sistema de eventos
require(`./Handler/Event`)(client, config);

// Inicia os Slash
if (config.slashtype === 'guild'|| config.slastype === 'normal') {
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
  })
exports.client = client;
