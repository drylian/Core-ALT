const { Client } = require('discord.js');
const { intents } = require('./utils/intents');

const client = new Client({ intents });

module.exports = { client };