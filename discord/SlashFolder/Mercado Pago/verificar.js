const { cores } = require('alter')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('verificar')
      .setDescription('Verifica status de compra.')
      .addUserOption((option) =>
        option.setName('payment_id').setDescription('O id do pagamento efetuado.'),
      ),
  
    async execute(interaction) {
    const ping = Date.now() - interaction.createdTimestamp;
    const embed = new EmbedBuilder()
      .setTitle('Status do Pagamento')
      .setColor(cores.green)
      .setDescription(`<a:9441alert:1090984691496136724> <a:9441alert:1090984691496136724> <a:9441alert:1090984691496136724> Pong! O ping é ${ping}ms.`);

    await interaction.reply({ embeds: [embed] });
  },
};
