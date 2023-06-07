const { Collection, REST, Routes } = require('discord.js');
const { join } = require('path');
const interactionCreate = require('./InteractionCreate');
const { readdirSync } = require('fs');
const { config, event,createCustomTable } = require('alter');

function loadSlashRest(client) {
  event.log('[ Slash-REST ] Iniciando Comandos Registro de Comandos Slash');

  client.slash = new Collection();

  const commands = [];
  const tableTitle = 'Comandos Slash';
  const tableHeaders = ['Comando', 'Status'];
  const tableRows = [];

  const commandFolders = readdirSync('./src/SlashFolder');
  for (const folder of commandFolders) {
    const commandFiles = readdirSync(join('./src/SlashFolder', folder)).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`../SlashFolder/${folder}/${file}`);
      if (command.data.name) {
        client.slash.set(command.data.name, command);
        commands.push(command.data);
        tableRows.push([command.data.name, 'OK']);
      } else {
        tableRows.push([command.data.name, 'FAIL   => Está faltando ou não é uma string']);
        continue;
      }
    }
  }

  const table = createCustomTable(tableTitle, tableHeaders, tableRows, 'magenta');
  console.log(table);

  const rest = new REST({ version: '10' }).setToken(config.token);

  (async () => {
    try {
      if (config.slastype === 'guild') {
        event.log('[ Slash-REST ] Registrando de Comandos Slash no Grupo');
        await rest.put(
          Routes.applicationGuildCommands(config.clientId, config.guildId),
          { body: commands }
        );
      } else {
        event.log('[ Slash-REST ] Registrando de Comandos Slash para a aplicação');
        await rest.put(
          Routes.applicationCommands(config.clientId, config.guildId),
          { body: commands }
        );
      }

      event.log('[ Slash-REST ] Comandos Slash foram Registrados com Sucesso');
    } catch (error) {
      event.err('[ Slash-REST ] Falha ao Registrar o Comando Slash:', error);
    }
  })();

  client.on(interactionCreate.name, (...args) => interactionCreate.run(client, ...args));
}

function loadSlashCommands(client) {
  event.log('[ Slash-Direct ] Iniciando Comandos Slash');

  client.slash = new Collection();

  const slash = [];
  const tableTitle = 'Comandos Slash';
  const tableHeaders = ['Comando', 'Status'];
  const tableRows = [];

  const commandFolders = readdirSync(`./src/SlashFolder`);
  for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./src/SlashFolder/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`../SlashFolder/${folder}/${file}`);
      if (command.data.name) {
        client.slash.set(command.data.name, command);
        slash.push(command.data);
        tableRows.push([command.data.name, 'OK']);
      } else {
        tableRows.push([command.data.name, 'FAIL => Está faltando ou não é uma string']);
        continue;
      }
    }
  }

  const table = createCustomTable(tableTitle, tableHeaders, tableRows, 'magenta');

  console.log(table);

  client.on('ready', async () => {
    await client.application.commands.set(slash);
  });

  client.on(interactionCreate.name, (...args) => interactionCreate.run(client, ...args));
}

module.exports = { loadSlashRest, loadSlashCommands };
