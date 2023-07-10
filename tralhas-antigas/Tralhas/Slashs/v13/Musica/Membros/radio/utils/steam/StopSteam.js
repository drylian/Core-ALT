const { getVoiceConnection } = require('@discordjs/voice');

function stopRadio(interaction) {
  const connection = getVoiceConnection(interaction.guild.id);

  if (connection) {
    connection.destroy();
    interaction.reply('Reprodução da estação de rádio parada.');
  } else {
    interaction.reply('Não estou conectado a um canal de voz.');
  }
}

module.exports = {
    stopRadio,
  };
  