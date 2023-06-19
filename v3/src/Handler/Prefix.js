const { event, settings } = require('alter');
const colors = require('colors');
const fs = require("fs");

module.exports = (client) => {
    event.log(`[${colors.blue(' Events ')}] Iniciando handler de prefix.`);

    fs.readdir("./src/Prefix/", (err, files) => {
        event.log(`[${colors.blue(' Prefix ')}] Carregando comandos Prefix.`);
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            if (file === 'index.js') return;
            let props = require(`../Prefix/${file}`);
            let commandName = file.split(".")[0];
            if (settings.includes(commandName)) return;
            event.log(`[${colors.blue(' Prefix ')}] ${commandName} adicionado .`);
            client.prefix.set(commandName, props);
        });
    });
}