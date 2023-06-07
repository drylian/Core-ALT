const { MessageEmbed } = require('discord.js');
const Logger = require('./Logger');
const { config } = require('../../Settings');
const Log = Logger.SlashManagerLogger();
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

    // Adiciona Config.Start.System.Timer milissegundos à data e hora atual
    let now = new Date();

    const tempo = parseInt(config.Slash.Propriedades.Tempo);
    const timecont = parseInt(config.Slash.Propriedades.Tempo / 1000);

    // Adiciona Config.Start.System.Timer milissegundos à data e hora atual
    let futureTime = new Date(now.getTime() + tempo);

    // Formata a data e hora futuras em uma string formatada pelo Discord
    let futureTimeString = `<t:${Math.floor(futureTime.getTime() / 1000)}:R>`;

    if (elapsedTime < timecont) {
      Log.logFlood(commandName, interaction.user.id, interaction.user.username, interaction.user.discriminator);
      const embed = new MessageEmbed()
        .setTitle('Comando usado muito rápido!')
        .setDescription(`Você poderá usar o comando ` + futureTimeString + `!`)
        .setColor('#FF0000');
      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }


    lastCommandUsed[interaction.user.id] = currentTime;

    try {
      await command.execute(interaction);
      Log.logCommand(commandName, interaction.user.id, interaction.user.username, interaction.user.discriminator);
    } catch (error) {
      console.error(error);
      Log.logError(commandName, error);
      const embed = new MessageEmbed()
        .setTitle('Erro ao usar o comando')
        .setDescription('Ocorreu um erro ao usar o comando, esse incidente foi registrado.')
        .setColor('#FF0000');
      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }
  },
};
