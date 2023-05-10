const { Client } = require('discord.js');
const { intents } = require('./Config/Intents');
const loadEvents = require('./Config/EventLoader');
const { config } = require('../Settings');
const client = new Client({ intents });
loadEvents(client);
client.login(config.token);
