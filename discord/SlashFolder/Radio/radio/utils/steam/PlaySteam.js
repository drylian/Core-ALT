const { MessageEmbed } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior, getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const { removeFileExtension } = require('../FormatName');
async function playRadio(interaction, musicURL, musicFiles, folderURL, musicAtual, status) {

  const member = interaction.member;
  const voiceChannel = member.voice.channel;

  // Verifica se já existe uma conexão de voz
  const existingConnection = getVoiceConnection(interaction.guild.id);

  // Cria um reprodutor de áudio
  const audioPlayer = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
  });

  // Conecta ao canal de voz existente ou cria uma nova conexão
  const connection = existingConnection || joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: interaction.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  // Cria uma fonte de áudio a partir da URL da música
  const audioResource = createAudioResource(musicURL, {
    metadata: {
      url: musicURL,
    },
  });

  // Adiciona a fonte de áudio ao reprodutor de áudio
  audioPlayer.play(audioResource);

  // Conecta o reprodutor de áudio à conexão de voz
  connection.subscribe(audioPlayer);

  // Acessa a propriedade 'url' dos metadados
  const metadataUrl = audioResource.metadata?.url;

  // Exibe a URL nos logs ou em algum outro lugar
  console.log('URL da música:', metadataUrl);

  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Estação de Rádio')
    .setDescription('Reproduzindo a estação de rádio.')
    .addFields(
      { name: 'Música Atual', value: musicAtual || 'Informação não disponível' },
      { name: 'Dica', value: 'Para pular para a próxima música, utilize /radio skip' }
    );

  let reply
  if (status === "1") {
    reply = await interaction.editReply({ embeds: [embed], fetchReply: true });
  } else {
    reply = await interaction.reply({ embeds: [embed], fetchReply: true });
  }
  audioPlayer.on(AudioPlayerStatus.Idle, () => {
    const randomIndex = Math.floor(Math.random() * musicFiles.length);
    const randomMusicFile = musicFiles[randomIndex];
    const musicName = encodeURIComponent(randomMusicFile.name);
    const musicAtual = removeFileExtension(randomMusicFile.name);
    const musicURL = `${folderURL}/${musicName}`;

    // Edita a resposta existente em vez de enviar uma nova resposta
    editRadioReply(interaction, reply, musicURL, musicFiles, folderURL, musicAtual);
  });
}

// Sistema que faz a musica tocar o tempo todo
async function editRadioReply(interaction, reply, musicURL, musicFiles, folderURL, musicAtual) {
  const member = interaction.member;
  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    await interaction.editReply('Você precisa estar em um canal de voz para reproduzir a estação de rádio.');
    return;
  }

  const existingConnection = getVoiceConnection(interaction.guild.id);

  const audioPlayer = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
  });

  const connection = existingConnection || joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: interaction.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  const audioResource = createAudioResource(musicURL, {
    metadata: {
      url: musicURL,
    },
  });

  audioPlayer.play(audioResource);

  connection.subscribe(audioPlayer);

  const metadataUrl = audioResource.metadata?.url;

  console.log('URL da música:', metadataUrl);

  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Estação de Rádio')
    .setDescription('Reproduzindo a estação de rádio.')
    .addFields(
      { name: 'Música Atual', value: musicAtual || 'Informação não disponível' },
      { name: 'Dica', value: 'Para pular para a próxima música, utilize /radio skip' }
    );

  await reply.edit({ embeds: [embed] });

  audioPlayer.on(AudioPlayerStatus.Idle, () => {
    const randomIndex = Math.floor(Math.random() * musicFiles.length);
    const randomMusicFile = musicFiles[randomIndex];
    const musicName = encodeURIComponent(randomMusicFile.name);
    const musicAtual = removeFileExtension(randomMusicFile.name);
    const musicURL = `${folderURL}/${musicName}`;

    editRadioReply(interaction, reply, musicURL, musicFiles, folderURL, musicAtual);
  });
}

module.exports = { playRadio };
