// SlashCommands/exemplo.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('exemplo')
    .setDescription('Exemplo de comando'),

  async execute(interaction) {
    await interaction.reply('Olá, mundo!');
  },
};

const embedData = {
  tte: 'Título do Embed',
  dsc: 'Descrição do Embed',
  adf: [
    { name: 'Campo 1', var: 'Valor 1' },
    { name: 'Campo 2', var: 'Valor 2' }
  ],
  clr: 'blue', // Cor do embed (opcional)
  chl: message.channel, // Canal para enviar o embed
  dm: message.author, // Enviar a DM para o autor da mensagem
  int: interaction, // para interações
  intr: interaction // para editar interações
};