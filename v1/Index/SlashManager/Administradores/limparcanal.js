const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { config } = require('../../../Settings');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('limparcanal')
    .setDescription('deleta o canal atual e cria um novo com o mesmo nome e permissões')
    .setDefaultPermission(false),
  async execute(interaction) {
    // Verifica se o usuário que executou o comando tem a permissão de gerenciar canais
    if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
      console.log('[ LIMPARCANAL > AVISO] Usuário sem permissão tentou executar o comando');
      const errorEmbed = new MessageEmbed()
        .setTitle('Erro ao Limpar o canal')
        .setDescription('Você não tem permissão para executar este comando.')
        .setColor('RED')
        .setThumbnail(config.Logo);
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    // Cria uma cópia do canal atual
    const channel = interaction.channel;
    const newChannel = await channel.clone();

    try {
      // Limpa o canal atual
      await channel.delete();

      // Envia uma mensagem informando que o canal foi nukado com sucesso
      const successEmbed = new MessageEmbed()
        .setTitle('Canal Limpado')
        .setDescription(`O canal ${channel.toString()} foi Limpado com sucesso por ${interaction.user.toString()}.`)
        .setColor('GREEN')
        .setThumbnail(config.Logo);
      await interaction.reply({ embeds: [successEmbed] });

      // Atualiza as permissões do novo canal para as mesmas do canal original
      const permissions = channel.permissionOverwrites.cache.map((role) => ({
        id: role.id,
        allow: role.allow.bitfield,
        deny: role.deny.bitfield,
        type: role.type,
      }));
      await newChannel.edit({
        name: channel.name,
        topic: channel.topic,
        nsfw: channel.nsfw,
        parent: channel.parent,
        position: channel.position,
        permissionOverwrites: permissions,
      });

    } catch (error) {
      console.error(`[ LIMPARCANAL > ERRO] Ocorreu um erro ao limpar o canal ${channel.name}:`, error);
      const errorEmbed = new MessageEmbed()
        .setTitle('Erro ao limpar o canal')
        .setDescription('Ocorreu um erro ao limpar o canal. Tente novamente mais tarde.')
        .setColor('RED')
        .setThumbnail(config.Logo);
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};
