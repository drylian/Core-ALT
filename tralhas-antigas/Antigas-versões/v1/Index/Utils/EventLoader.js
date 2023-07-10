const { readdirSync } = require('fs');
const Logger = require('./Logger');
const colors = require('colors');
const Log = Logger.EventManagerLogger();
const fs = require('fs')

function loadEvents(client) {
  console.log(`[${colors.rainbow(' Client ')}] Iniciando eventos de inicialização.`);

  const logEvent = './Index/Events/Start/Setup';

  if (!fs.existsSync(logEvent)) {
    console.log(`[${colors.magenta(' Evento ')}] Pasta Setup não existe, Criando uma.`);
    fs.mkdirSync(logEvent);
  }

  const startFiles = readdirSync('./Index/Events/Start').filter(file => file.endsWith('.js'));
  let event = [];
  for (const file of startFiles) {
    const currentEvent = require(`../Events/Start/${file}`);
    event.push(file);
    client.on(currentEvent.name, async (...args) => {
      try {
        await currentEvent.run(client, ...args);
        Log.logCommand(file)
      } catch (error) {
        Log.logError(file, error);
      }
    });
  }

  const eventsTotal = event.length;
  console.log(`[ ${colors.rainbow('Client')} ]  ${colors.cyan('Eventos')} - ${colors.green(eventsTotal)} [ ${colors.magenta(event.join(', '))} ] `);
}

module.exports = loadEvents;
