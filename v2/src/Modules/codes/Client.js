const { Client } = require('discord.js');
const { config } = require('../../../Settings');
const { intents } = require('./utils/intents');

const client = new Client({ intents });

module.exports = { client };