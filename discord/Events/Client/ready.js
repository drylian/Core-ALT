const { client, event } = require('alter');
const colors = require('colors');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: "ready"
};

client.once('ready', async () => {
  event.log(`[${colors.red(' Ready ')}] Iniciando handler de iniciação do bot: ${colors.red(client.user.tag)}.`);
  const readerFiles = fs.readdirSync('./discord/Events/Client/Readers').filter(file => file.endsWith('.js'));

  for (const file of readerFiles) {
    const reader = require(path.join(__dirname, 'Readers', file));
    if (reader.name && reader.run) {
      reader.run(client);
      event.log(`[${colors.red(' Ready ')}] Carregado: ${colors.cyan(reader.name)}`);
    }
  }

});
