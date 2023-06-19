const { EmbedBuilder } = require('discord.js');
const { config, slash, cores, client } = require('alter');
const lastCommandUsed = {};

module.exports = {
  name: "interactionCreate"
};

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  const command = client.slash.get(commandName);

  if (!command) return;

  const currentTime = new Date().getTime();
  const lastTime = lastCommandUsed[interaction.user.id] || 0;
  const elapsedTime = (currentTime - lastTime) / 1000;

  const timecont = parseInt(config.events.slash.tempo / 1000);
  const timeRemaining = (timecont - elapsedTime).toFixed(2); // Format the time to two decimal places

  if (elapsedTime < timecont) {
    slash.flood(commandName, interaction.user.id, interaction.user.username, interaction.user.discriminator);
    const embed = new EmbedBuilder()
      .setTitle('Comando usado muito rápido!')
      .setDescription(`Você poderá usar o comando novamente em ` + '``' + timeRemaining + '``' + ` segundos.`)
      .setColor(cores.red);
    const reply = await interaction.reply({ embeds: [embed], ephemeral: true });

    // Remover o embed após o tempo passar
    await sleep((timecont - elapsedTime) * 1000);
    await reply.delete();

    return;
  }

  lastCommandUsed[interaction.user.id] = currentTime;

  try {
    await command.execute(interaction);
    slash.cmd(commandName, interaction.user.id, interaction.user.username, interaction.user.discriminator);
  } catch (error) {
    console.error(error);
    slash.err(commandName, error);
    const embed = new EmbedBuilder()
      .setTitle('Erro ao usar o comando')
      .setDescription('Ocorreu um erro ao usar o comando.')
      .addFields(
        { name: 'Comando com erro:', value: commandName },
        { name: 'Registro:', value: 'Esse incidente foi registrado.' },
        { name: 'Aviso:', value: 'Essa mensagem de erro vai sumir em ' + '``' + '10' + '``' + ' segundos' }
      )
      .setColor(cores.red);
    const reply = await interaction.reply({ embeds: [embed], ephemeral: true });


    setTimeout(() => {
      reply.delete().catch(console.error);
    }, 10000);

    return;
  }


  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
)

