const { IntentsBitField } = require('discord.js');

module.exports = {
  intents: [
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildInvites,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildScheduledEvents,
    IntentsBitField.Flags.GuildWebhooks,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent
  ]
};
