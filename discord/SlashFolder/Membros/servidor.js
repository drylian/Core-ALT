const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { cores, config } = require('alter')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('servidor')
    .setDescription('Exibe informações sobre o servidor'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(cores.blue) 
      .setTitle(config.slash.info.name)
      .setDescription(config.slash.info.desc)
      .addFields(
        { name: 'Dono', value: config.slash.info.dono },
        { name: 'ID', value: config.slash.info.id },
        { name: 'Número de membros', value: interaction.guild.memberCount.toString() },
        { name: 'Website', value: config.slash.info.website, inline: true },
        { name: 'Painel', value: config.slash.info.painel, inline: true },
        { name: 'Grupo Criado', value: interaction.guild.createdAt.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) }
      )
      .setThumbnail(config.logo);

    await interaction.reply({ embeds: [embed] });
  },
};
