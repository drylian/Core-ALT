const { Client, Intents, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, guildId, clientId } = require('./config.json');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

console.log(`[ SLASH ] Iniciando Registro dos Comandos Slash.`);

client.commands = new Collection();

// Iterate over each folder in the Comandos directory
const commandFolders = readdirSync('./SlashCommands');
for (const folder of commandFolders) {
  // Iterate over each file in the current folder
  const commandFiles = readdirSync(`./SlashCommands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./SlashCommands/${folder}/${file}`);
    client.commands.set(command.data.name, command);
    command.category = folder;
    console.log(`[ ${command.category} ] Comando Slash "${command.data.name}" foi registrado com sucesso.`);
  }
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    const commands = client.commands.map(command => command.data.toJSON());
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );      
    console.log('[ SLASH ] Os Comandos Slash foram registrados com sucesso, iniciando bot!');
  } catch (error) {
    console.error(error);
  }
})();

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
  }
});

console.log(`[ INICIALIZADOR ] detectando scripts de Start.`);

const startFiles = readdirSync('./Eventos/Start').filter(file => file.endsWith('.js'));
for (const file of startFiles) {
  const event = require(`./Eventos/Start/${file}`);
  console.log(`[ STARTFILES ] ${file} Detectado.`);
  client.on(event.name, event.run.bind(null, client));
}

console.log(`[ FINALIZADO ] O Bot está pronto para ser usado.`);

client.login(token);
