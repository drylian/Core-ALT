const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { config } = require('../../../Settings');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Bloqueia o canal atual para membros sem permissão.')
    .addStringOption(option => 
      option.setName('reason')
      .setDescription('Motivo do bloqueio (opcional)')
      .setRequired(false)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
      const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Erro')
        .setDescription('Você não tem permissão para usar este comando.')
        .setThumbnail(config.Logo);
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const channel = interaction.channel;
    const reason = interaction.options.getString('reason') || 'sem motivo';

    if (!channel.permissionsFor(interaction.guild.roles.everyone).has('SEND_MESSAGES')) {
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setTitle('Aviso')
        .setDescription(`O canal ${channel} já está bloqueado.`)
        .setThumbnail(config.Logo);
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (channel.isThread()) {
      await channel.setArchived(true);
    } else {
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: false });
    }

    const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('🔒 Canal trancado')
      .setDescription(`O canal ${channel} foi bloqueado com sucesso.`)
      .addFields(
        { name: 'Administrador', value: interaction.user.toString(), inline: true },
        { name: 'Motivo', value: reason, inline: true }
      )
      .setThumbnail(config.Logo);
    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
