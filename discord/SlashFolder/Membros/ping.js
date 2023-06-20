const { cores } = require('alter')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Mostra o ping do bot'),

  async execute(interaction) {
    const ping = Date.now() - interaction.createdTimestamp;
    const embed = new EmbedBuilder()
      .setTitle('Ping!')
      .setColor(cores.blue)
      .setDescription(`Pong! O ping é ${ping}ms.`);

    await interaction.reply({ embeds: [embed] });
  },
};
