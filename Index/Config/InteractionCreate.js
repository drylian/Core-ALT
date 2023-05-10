const { MessageEmbed } = require('discord.js');
const { logCommand, logError, logFlood } = require('./Logger');
const lastCommandUsed = {};

module.exports = {
  name: 'interactionCreate',
  run: async (client, interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const command = client.commands.get(commandName);

    if (!command) return;

    const currentTime = new Date().getTime();
    const lastTime = lastCommandUsed[interaction.user.id] || 0;
    const elapsedTime = (currentTime - lastTime) / 1000;

    if (elapsedTime < 5) {
      const remainingTime = Math.ceil(5 - elapsedTime);
      logFlood(commandName, interaction.user.id, interaction.user.username, interaction.user.discriminator);
      const embed = new MessageEmbed()
        .setTitle('Comando usado muito rápido!')
        .setDescription(`Aguarde ${remainingTime} segundos antes de usar outro comando!`)
        .setColor('#FF0000');
      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    lastCommandUsed[interaction.user.id] = currentTime;

    try {
      await command.execute(interaction);
      logCommand(commandName, interaction.user.id, interaction.user.username, interaction.user.discriminator);
    } catch (error) {
      console.error(error);
      logError(commandName, error);
      const embed = new MessageEmbed()
        .setTitle('Erro ao usar o comando')
        .setDescription('Ocorreu um erro ao usar o comando, esse incidente foi registrado.')
        .setColor('#FF0000');
      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }
  },
};
