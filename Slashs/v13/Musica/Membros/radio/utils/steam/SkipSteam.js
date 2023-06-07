const { getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');

async function skipSong(interaction) {
  const connection = getVoiceConnection(interaction.guild.id);

  if (connection && connection.state.status === AudioPlayerStatus.Playing) {
    const player = connection.state.subscription.player;

    // Aguarda a música atual parar
    await new Promise((resolve) => {
      player.once(AudioPlayerStatus.Idle, () => {
        resolve();
      });
      player.stop();
    });

    const radioID = interaction.options.getInteger('id');
    const selectedRadio = radioDataFile.find((radio) => radio.id === radioID);

    if (!selectedRadio) {
      interaction.reply('A estação de rádio selecionada não existe.');
      return;
    }

    const folderURL = selectedRadio.url;

    try {
      const response = await axios.get(folderURL);

      let files = response.data;

      const musicFiles = files.filter((file) => file.type === 'file' && file.name.endsWith('.mp3'));

      if (musicFiles.length === 0) {
        interaction.reply('Não foram encontradas músicas na estação de rádio.');
        return;
      }

      const randomIndex = Math.floor(Math.random() * musicFiles.length);
      const randomMusicFile = musicFiles[randomIndex];
      const musicName = encodeURIComponent(randomMusicFile.name);
      const musicURL = `${folderURL}/${musicName}`;

      await playRadio(interaction, musicURL, musicFiles, folderURL);
    } catch (error) {
      console.error(error);
      interaction.reply('Ocorreu um erro ao obter a lista de músicas da estação de rádio.');
    }
  } else {
    interaction.reply('Não estou reproduzindo uma estação de rádio no momento.');
  }
}

module.exports = {
    skipSong,
  };
  