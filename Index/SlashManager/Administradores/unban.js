const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Config/config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Desbane um usuário do servidor')
    .addStringOption(option => option.setName('usuário').setDescription('ID do usuário a ser desbanido').setRequired(true))
    .addStringOption(option => option.setName('motivo').setDescription('Motivo do desbanimento').setRequired(false)),
  async execute(interaction) {
    try {
      const userID = interaction.options.getString('usuário');

      // Verificar se o usuário tem permissão para desbanir membros
      if (!interaction.member.permissions.has('BAN_MEMBERS')) {
        console.log(`Usuário ${interaction.user.id} tentou usar o comando unban sem permissão.`);
        const embed = new MessageEmbed()
          .setTitle('Erro')
          .setDescription('Você não tem permissão para desbanir membros.')
          .setColor('RED')
          .setThumbnail(config.Logo);
        return await interaction.reply({ embeds: [embed], ephemeral: true });
      }

      // Verificar se o usuário a ser desbanido está realmente banido
      const bans = await interaction.guild.bans.fetch();
      if (!bans.has(userID)) {
        console.log(`[ UNBAN ]Usuário ${interaction.user} tentou desbanir um usuário que não está banido.`);
        const embed = new MessageEmbed()
          .setTitle('Erro')
          .setDescription('O usuário especificado não está banido.')
          .setColor('RED')
          .setThumbnail(config.Logo);
        return await interaction.reply({ embeds: [embed], ephemeral: true });
      }

      // Verificar se o ID do usuário é válido
      if (isNaN(userID)) {
        console.log(`[ UNBAN ] Usuário ${interaction.user} tentou desbanir um usuário com um ID inválido.`);
        const embed = new MessageEmbed()
          .setTitle('Erro')
          .setDescription('O ID do usuário especificado é inválido.')
          .setColor('RED')
          .setThumbnail(config.Logo);
        return await interaction.reply({ embeds: [embed], ephemeral: true });
      }

      const reason = interaction.options.getString('motivo') || 'Nenhum motivo especificado';
      const embed = new MessageEmbed()
        .setTitle('Usuário desbanido')
        .setDescription(`${userID} foi desbanido por ${interaction.user} por ${reason}`)
        .setColor('GREEN')
        .setThumbnail(config.Logo);
      await interaction.reply({ embeds: [embed] });

      // Desbanir o usuário
      await interaction.guild.members.unban(userID, { reason });
      console.log(`[ UNBAN ] Usuário ${userID} foi desbanido por ${interaction.user.id} por ${reason}`);
    } catch (error) {
      console.error(error);
      console.log(`[ ERRO > UNBAN ] Ocorreu um erro ao desbanir o usuário ${interaction.user.id}.`);
      const embed = new MessageEmbed()
        .setTitle('Erro')
        .setDescription('Ocorreu um erro ao desbanir o usuário.')
        .setColor('RED')
        .setThumbnail(config.Logo);
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
