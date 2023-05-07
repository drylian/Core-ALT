const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bane um usuário do servidor')
    .addUserOption(option =>
      option.setName('usuário')
        .setDescription('Usuário a ser banido')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('motivo')
        .setDescription('Motivo do banimento')),

  async execute(interaction) {
    const user = interaction.options.getUser('usuário');
    const reason = interaction.options.getString('motivo') || 'Nenhum motivo especificado';
    
    // Verifica se o usuário que executou o comando tem permissão para banir usuários
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      console.log(`[ ⚠️   ] ${interaction.user.username}#${interaction.user.discriminator} tentou banir ${user.username}#${user.discriminator} sem ter permissão.`);
      return interaction.reply({ content: 'Você não tem permissão para banir usuários!', ephemeral: true });
    }
    
    // Verifica se o bot tem permissão para banir usuários com cargo superior
    const botMember = interaction.guild.members.me;
    const userMember = await interaction.guild.members.fetch(user.id);
    if (!botMember.permissions.has('BAN_MEMBERS') || botMember.roles.highest.comparePositionTo(userMember.roles.highest) <= 0) {
        console.log(`[ ⚠️   ] ${interaction.user.username}#${interaction.user.discriminator} tentou banir ${user.username}#${user.discriminator} que tem um cargo superior.`);
        return interaction.reply({ content: 'Eu não tenho permissão para banir usuários com cargo superior ao meu!', ephemeral: true });
    }  
    
    // Tenta banir o usuário
    try {
      await interaction.guild.members.ban(user, { reason });
      
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Usuário banido com sucesso!')
        .setDescription(`${user.username}#${user.discriminator} foi banido do servidor.`)
        .addFields(
          { name: 'Usuário banido', value: `${user.username}#${user.discriminator}` },
          { name: 'Moderador responsável', value: `${interaction.user.username}#${interaction.user.discriminator}` },
          { name: 'Motivo', value: reason },
          { name: 'Data e Hora', value: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) }
        );

      console.log(`[ 🟢   ] ${interaction.user.username}#${interaction.user.discriminator} baniu o(a) ${user.username}#${user.discriminator} com o Slash /ban.`);

      const logsChannel = interaction.guild.channels.cache.find(channel => channel.name === 'logs');
      if (logsChannel) {
        logsChannel.send({ embeds: [embed] });
      }
      
      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: 'Ocorreu um erro ao banir o usuário!', ephemeral: true });
    }
  },
};
