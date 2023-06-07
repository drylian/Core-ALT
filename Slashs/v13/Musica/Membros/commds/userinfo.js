const { SlashCommandBuilder } = require('@discordjs/builders');
const createUserInfoEmbed = require('./Embeds/userinfo');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Exibe informações do usuário.')
    .addUserOption((option) =>
      option.setName('usuário').setDescription('O usuário sobre o qual você deseja obter informações.'),
    ),

  async execute(interaction) {
    const member = interaction.options.getMember('usuário') || interaction.member;

    const embed = createUserInfoEmbed(member);

    try {
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'Ocorreu um erro ao executar este comando.',
        ephemeral: true,
      });
    }
  },
};
