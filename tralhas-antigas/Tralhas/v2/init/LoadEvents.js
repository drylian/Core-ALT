const { readdirSync } = require('fs');
const { event } = require('alter');
const colors = require('colors');

function DiscordEvents(client) {
  event.log(`[${colors.rainbow(' Discord ')}] Iniciando eventos de inicialização.`);

  const startFiles = readdirSync('./src/Events/Discord').filter(file => file.endsWith('.js'));
  let events = [];
  for (const file of startFiles) {
    const currentEvent = require(`../Events/Discord/${file}`);;
    events.push(file);
    client.on(currentEvent.name, async (...args) => {
      try {
        await currentEvent.run(client, ...args);
      } catch (error) {
        event.err(file, error);
      }
    });
  }
  
  const eventsTotal = events.length;
  console.log(`[ ${colors.rainbow('Discord')} ]  ${colors.cyan('Eventos')} - ${colors.green(eventsTotal)} [ ${colors.magenta(events.join(', '))} ] `);
}

module.exports = DiscordEvents;
