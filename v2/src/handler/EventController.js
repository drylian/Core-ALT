const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { event } = require('alter');
const colors = require('colors');
const path = require('path');

function loadEvents(client) {
  event.log(`[ ${colors.rainbow(' Events ')} ] Iniciando eventos de inicialização.`);
  client.events = new Collection();
  const eventFiles = readdirSync('./src/Events/Core').filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const eventModule = require(path.join(__dirname, `../events/Core/${file}`));

    if (!eventModule || !eventModule.name || !eventModule.run) {
      event.err(file, 'O arquivo de evento está faltando as propriedades "name" ou "run".');
      continue;
    }

    client.events.set(eventModule.name, eventModule);

    client.on(eventModule.name, (...args) => {
      try {
        event.log(`Evento chamado: ${eventModule.name}`);
        eventModule.run(client, ...args);
      } catch (error) {
        event.err(file, error);
      }
    });
  }

  const eventsTotal = eventFiles.length;
  event.log(`[ ${colors.rainbow('Events')} ] ${colors.cyan('Eventos')} - ${colors.green(eventsTotal)} [ ${colors.magenta(eventFiles.join(', '))} ] `);
}

module.exports = loadEvents;
