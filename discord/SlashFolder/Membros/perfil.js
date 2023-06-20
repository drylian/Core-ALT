const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { cores } = require('alter')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('perfil')
    .setDescription('Exibe informações do usuário.')
    .addUserOption((option) =>
      option.setName('usuário').setDescription('O usuário sobre o qual você deseja obter o perfil.'),
    ),

  async execute(interaction) {
    const member = interaction.options.getMember('usuário') || interaction.member;

    const user = member.user;
    const embed = new EmbedBuilder()
        .setTitle('Informações do usuário')
        .addFields(
            { name: 'Nome', value: user.username },
            { name: 'ID', value: user.id },
            { name: 'Entrou no servidor em', value: member.joinedAt.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) },
            { name: 'Conta criada em', value: user.createdAt.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) },
        )
        .setColor(cores.blue)
        .setThumbnail(user.avatarURL({ dynamic: true }))
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
  },
};
