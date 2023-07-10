// SlashCommands/exemplo.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('exemplo')
    .setDescription('Exemplo de comando'),

  async execute(interaction) {
    await interaction.reply('Olá, mundo!');
  },
};
