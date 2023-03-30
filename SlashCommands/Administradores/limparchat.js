const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Config/config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('limparchat')
    .setDescription('Limpa o chat do canal atual')
    .setDefaultPermission(false)
    .addStringOption(option => option.setName('valor').setDescription('Número de mensagens que serão limpas.').setRequired(true)),
  async execute(interaction) {
    // Verifica se o usuário que executou o comando tem a permissão de gerenciar mensagens
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      console.log('[ CLEAR > AVISO ] Usuário sem permissão tentou executar o comando');
      const errorEmbed = new MessageEmbed()
        .setTitle('Erro ao limpar chat')
        .setDescription('Você não tem permissão para executar este comando.')
        .setColor('RED')
        .setThumbnail(config.Logo);
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const value = interaction.options.getString('valor');
    const numMessages = parseInt(value);

    // Verifica se o valor inserido é um número válido
    if (isNaN(numMessages) || numMessages < 1 || numMessages > 100) {
      console.log('[ CLEAR > AVISO ] Valor inválido inserido pelo usuário');
      const errorEmbed = new MessageEmbed()
        .setTitle('Erro ao limpar chat')
        .setDescription('Insira um número válido de mensagens para limpar (entre 1 e 100).')
        .setColor('RED')
        .setThumbnail(config.ErrorImage);
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const messages = await interaction.channel.messages.fetch({ limit: numMessages });

    // Verifica se há alguma mensagem para apagar
    if (messages.size === 0) {
      console.log('[ CLEAR > AVISO ] Não há mensagens para apagar');
      const noMessagesEmbed = new MessageEmbed()
        .setTitle('Chat limpo')
        .setDescription('Não há mensagens para apagar.')
        .setColor('GREEN')
        .setThumbnail(config.Logo);
      return interaction.reply({ embeds: [noMessagesEmbed] });
    }

    try {
      await interaction.channel.bulkDelete(messages, true);
      console.log(`[ CLEAR ] ${numMessages} mensagens foram limpas no canal ${interaction.channel.name} pelo usuário ${interaction.user.tag}`);
      const successEmbed = new MessageEmbed()
        .setTitle('Chat limpo')
        .setDescription(`Foram limpas ${numMessages} mensagens no canal ${interaction.channel.toString()} por ${interaction.user.toString()}.`)
        .setColor('GREEN')
        .setThumbnail(config.Logo);
      return interaction.reply({ embeds: [successEmbed] });
    } catch (error) {
      console.error(`[ CLEAR > ERRO ] Ocorreu um erro ao limpar o chat do canal ${interaction.channel.name}:`, error);
      const errorEmbed = new MessageEmbed()
        .setTitle('Erro ao limpar chat')
        .setDescription('Ocorreu um erro ao limpar o chat. Tente novamente mais tarde.')
        .setColor('RED')
        .setThumbnail(config.ErrorImage);
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};
