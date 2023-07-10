const { Client } = require('discord.js');
const { config } = require('../../Settings');
const { intents } = require('./Intents');

const client = new Client({ intents });

client.login(config.token);

module.exports = { client };