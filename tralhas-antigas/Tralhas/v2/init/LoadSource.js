const { readdirSync } = require('fs')
const { event } = require('alter')
const DiscordEvents = require('./LoadEvents')
const colors = require('colors')

function loadBotSource(client) {
  event.log(`[ ${colors.rainbow('Sistema')} ] Carregando iniciações do Sistema.`);

  const botSourceFiles = readdirSync('./src/Events/Core').filter(file => file.endsWith('.js'));

  const loadSource = async (file) => {
    try {
      const source = require(`../Events/Core/${file}`);
      await source.load(client);
      event.log(`[ ${colors.rainbow('Sistema')} ] Source carregada: ${colors.green(file)}`);
    } catch (error) {
      event.err(file, error);
    }
  };

  (async () => {
    for (const file of botSourceFiles) {
      await loadSource(file);
    }

    event.log(`[ ${colors.rainbow('Sistema')} ] Carregamento da source do bot concluído.`);
    DiscordEvents(client); // Chama a função para iniciar os eventos do bot após carregar a source
  })();
}

module.exports = loadBotSource;
