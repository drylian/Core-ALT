const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { config } = require('../../../Settings');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Desbloqueia um canal para todos os membros')
    .addChannelOption((option) =>
      option.setName('canal')
        .setDescription('O canal a ser desbloqueado')
        .setRequired(true)),
  async execute(interaction) {
    // Verifica se o usuário tem permissão para executar o comando
    if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
      console.log('[ UNLOCK > AVISO ] O usuário ' + interaction.user.tag + ' tentou executar o comando sem a permissão necessária.');
      const errorEmbed = new MessageEmbed()
        .setTitle('Erro ao desbloquear canal')
        .setDescription('Você não tem permissão para executar esse comando.')
        .setColor('RED')
        .setThumbnail(config.Logo);
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const channel = interaction.options.getChannel('canal');

    // Verifica se o canal a ser desbloqueado é um canal de voz
    if (channel.type === 'GUILD_VOICE') {
      console.log('[ UNLOCK > AVISO ] O usuário ' + interaction.user.tag + ' tentou desbloquear um canal de voz.');
      const errorEmbed = new MessageEmbed()
        .setTitle('Erro ao desbloquear canal')
        .setDescription('Não é possível desbloquear um canal de voz.')
        .setColor('RED')
        .setThumbnail(config.Logo);
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    if (channel.permissionsFor(interaction.guild.roles.everyone).has('SEND_MESSAGES')) {
        console.log('[ UNLOCK > AVISO ] O canal ' + channel.name + ' já está desbloqueado.');
        const errorEmbed = new MessageEmbed()
          .setTitle('Erro ao desbloquear canal')
          .setDescription(`O canal ${channel} já está desbloqueado.`)
          .setColor('RED')
          .setThumbnail(config.Logo);
        return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      }
    // Desbloqueia o canal
    channel.permissionOverwrites.set([
      {
        id: interaction.guild.roles.everyone.id,
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
      },
    ]);

    console.log('[ UNLOCK ] O usuário ' + interaction.user.tag + ' desbloqueou o canal #' + channel.name + '.');

    const successEmbed = new MessageEmbed()
      .setTitle(':unlock: Canal desbloqueado')
      .setDescription(`O canal ${channel} foi desbloqueado com sucesso.`)
      .addFields(
        { name: 'Administrador', value: interaction.user.toString() },
      )
      .setColor('GREEN')
      .setThumbnail(config.Logo);
    await interaction.reply({ embeds: [successEmbed] });
  },
};
