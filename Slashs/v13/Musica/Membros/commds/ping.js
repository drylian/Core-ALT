const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Mostra o ping do bot'),

  async execute(interaction) {
    const ping = Date.now() - interaction.createdTimestamp;
    const embed = new MessageEmbed()
      .setTitle('Ping!')
      .setColor('#0099ff')
      .setDescription(`Pong! O ping é ${ping}ms.`);

    await interaction.reply({ embeds: [embed] });
  },
};
