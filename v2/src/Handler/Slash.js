const { REST, Routes } = require('discord.js');
const colors = require('colors');
const { join } = require('path');
const { readdirSync } = require('fs');
const fs = require('fs')
const { config, event, createCustomTable, db } = require('alter');

function loadSlashRest(client) {
  event.log(`[${colors.red(' Slash-REST ')}]` + 'Iniciando Comandos Registro de Comandos Slash');

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
        const commandData = {
          name: command.data.name,
          active: null,
          category: folder,
          slash: join(`SlashFolder/${folder}/${file}`),
          editedAt: fs.statSync(join('./src/SlashFolder', folder, file)).mtime,
          data: command.data
        };
        db.slash.set(command.data.name, commandData);
        client.slash.set(command.data.name, command);
        commands.push(command.data);
        tableRows.push([command.data.name, 'OK']);
      } else {
        tableRows.push([command.data.name, 'FAIL   => Está faltando ou não é uma string']);
        continue;
      }
    }
  }

  const table = createCustomTable(tableTitle, tableHeaders, tableRows, 'red');
  console.log(table);

  const rest = new REST({ version: '10' }).setToken(config.token);

  (async () => {
    try {
      if (config.slastype === 'guild') {
        event.log(`[${colors.red(' Slash-REST ')}]` + ' Registrando de Comandos Slash no Grupo');
        await rest.put(
          Routes.applicationGuildCommands(config.clientId, config.guildId),
          { body: commands }
        );
      } else {
        event.log(`[${colors.red(' Slash-REST ')}]` + ' Registrando de Comandos Slash para a aplicação');
        await rest.put(
          Routes.applicationCommands(config.clientId, config.guildId),
          { body: commands }
        );
      }

      event.log(`[${colors.red(' Slash-REST ')}]` + ' Comandos Slash foram Registrados com Sucesso');
    } catch (error) {
      event.err(`[${colors.red(' Slash-REST ')}]` + ' Falha ao Registrar o Comando Slash:', error);
    }
  })();

}

function loadSlashCommands(client) {
  event.log(`[${colors.red(' Slash-Direct ')}]` + ' Iniciando Comandos Slash');

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
        const commandData = {
          name: command.data.name,
          active: null,
          category: folder,
          slash: join(`SlashFolder/${folder}/${file}`),
          editedAt: fs.statSync(join('./src/SlashFolder', folder, file)).mtime,
          data: command.data
        };
        db.slash.set(command.data.name, commandData);
        client.slash.set(command.data.name, command);
        slash.push(command.data);
        tableRows.push([command.data.name, 'OK']);
      } else {
        tableRows.push([command.data.name, 'FAIL => Está faltando ou não é uma string']);
        continue;
      }
    }
  }

  const table = createCustomTable(tableTitle, tableHeaders, tableRows, 'red');

  console.log(table);

  client.on('ready', async () => {
    await client.application.commands.set(slash);
  });

}

module.exports = { loadSlashRest, loadSlashCommands };
