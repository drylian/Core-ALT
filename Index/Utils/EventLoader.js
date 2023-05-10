const { readdirSync } = require('fs');
const colors = require('colors');
const { Client } = require('discord.js');

function loadEvents(client) {
  console.log(`[${colors.rainbow(' Client ')}] Iniciando eventos de inicialização.`);

  const startFiles = readdirSync('./Index/Events/Start').filter(file => file.endsWith('.js'));
  let event = [];
  for (const file of startFiles) {
    const currentEvent = require(`../Events/Start/${file}`);
    event.push(file);
    client.on(currentEvent.name, currentEvent.run.bind(null, client));
  }
  const eventsTotal = event.length;
  console.log(`[ ${colors.rainbow('Client')} ]  ${colors.cyan('Eventos')} - ${colors.green(eventsTotal)} [ ${colors.magenta(event.join(', '))} ] `);
}

module.exports = loadEvents;
