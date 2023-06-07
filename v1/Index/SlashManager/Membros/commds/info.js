const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { config } = require('../../../Settings');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Exibe informações sobre o servidor'),
  async execute(interaction) {
    const embed = new Discord.MessageEmbed()
      .setColor(Math.floor(Math.random()*16777215).toString(16)) // Gera uma cor aleatória em hexadecimal
      .setTitle(config.Slash.Membros.Info.Name)
      .setDescription(config.Slash.Membros.Info.Desc)
      .addFields(
        { name: 'Dono', value: config.Slash.Membros.Info.Dono },
        { name: 'ID', value: config.Slash.Membros.Info.ID },
        { name: 'Número de membros', value: interaction.guild.memberCount.toString() },
        { name: 'Website', value: config.Slash.Membros.Info.Website, inline: true },
        { name: 'Painel', value: config.Slash.Membros.Info.Painel, inline: true },
        { name: 'Grupo Criado', value: interaction.guild.createdAt.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) }
      )
      .setThumbnail(config.Logo);

    await interaction.reply({ embeds: [embed] });
  },
};
