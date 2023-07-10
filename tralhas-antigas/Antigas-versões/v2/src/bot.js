const { Collection } = require('discord.js');
const { client, config } = require('alter');
const { loadSlashRest, loadSlashCommands } = require("./Handler/Slash")
const loadExpress = require('./Express/LoadExpress');

// Inicia os Collections
client.events = new Collection();
client.slash = new Collection();

// Inicia o sistema de eventos
require(`./Handler/Event`)(client, config);

// Inicia o front End
if (config.express.active === true) {
    loadExpress(client);
}

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
  });