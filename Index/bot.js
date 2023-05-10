const { Client } = require('discord.js');
const { intents } = require('./Utils/Intents');
const loadEvents = require('./Utils/EventLoader');
const { config } = require('../Settings');
const client = new Client({ intents });
loadEvents(client);
client.login(config.token);
