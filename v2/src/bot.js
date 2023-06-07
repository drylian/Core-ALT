const { client, config } = require('alter');
const { loadSlashRest, loadSlashCommands } = require("./handler/SlashController")
const loadExpress = require('./Express/LoadExpress');
const loadEvents = require('./handler/EventController');
// Inicia os Novos Eventos
loadEvents(client);
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

client.login(config.token);
