const { event } = require('alter');
const colors = require('colors');
const fs = require("fs");

module.exports = (client) => {
  event.log(`[${colors.blue(' Events ')}] Iniciando handler de eventos.`);
  
  fs.readdirSync('./discord/Events/').forEach(dir => {
		const events = fs.readdirSync(`./discord/Events/${dir}`).filter(file => file.endsWith('.js'));
		for (let file of events) {
      
			let events = require(`../Events/${dir}/${file}`);
			if (events.name) {
				client.events.set(events.name, events);
				event.log(`[ ${colors.blue('Events')} ] Carregado: ${colors.magenta(events.name)}`)
			} else {
				event.log(`[ ${colors.blue('Events')}] Não foi possível carregar o arquivo ${file}. nome ou aliases ausentes.`)
				continue;
			}
      
		}
	});
}