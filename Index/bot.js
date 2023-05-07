const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const { token } = require('./Config/config.json');
const colors = require('colors');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

console.log(`[${colors.blue(' BOT ')}] Iniciando eventos de inicialização.`);

const startFiles = readdirSync('./Index/Events/Start').filter(file => file.endsWith('.js'));
for (const file of startFiles) {
  const event = require(`./Events/Start/${file}`);
  console.log(`[${colors.blue(' BOT ')}] ${colors.yellow(file)} iniciado.`);
  client.on(event.name, event.run.bind(null, client));
}

client.login(token);
