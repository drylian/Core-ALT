const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { createAudioPlayer, createAudioResource, entersState, AudioPlayerStatus, VoiceConnectionStatus, joinVoiceChannel } = require('@discordjs/voice');
const fs = require('fs');
const path = require('path');
const Fuse = require('fuse.js');

const musicPath = path.join(__dirname, '..', '..', 'Musicas');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Executa uma música local aleatória')
    .addStringOption(option =>
      option.setName('nome')
        .setDescription('O nome da música a ser reproduzida')
        .setRequired(false)),
  async execute(interaction) {
    if (!interaction.member.voice.channel) {
      return await interaction.reply({ content: 'Você precisa estar em um canal de voz para usar o bot!', ephemeral: true });
    }
    
    if (interaction.deferred || interaction.replied) return; // verificação para evitar respostas duplicadas
    
    const player = createAudioPlayer();
    const connection = await joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });
    
    try {
      let filenames = fs.readdirSync(musicPath).filter(file => file.endsWith('.mp3'));
      if (filenames.length === 0) {
        return await interaction.reply({ content: 'Nenhuma música encontrada!', ephemeral: true });
      }
      
      let currentSongIndex = 0;
      
      let nomeDaMusica = interaction.options.getString('nome');
      if (nomeDaMusica) {
        const fuse = new Fuse(filenames, { threshold: 0.3 });
        const results = fuse.search(nomeDaMusica).slice(0, 5);
        if (results.length === 0) {
          return await interaction.reply({ content: 'Nenhuma música encontrada com esse nome!', ephemeral: true });
        }
        filenames = results.map(result => result.item);
      }
      
      const playSong = async () => {
        const songPath = path.join(musicPath, filenames[currentSongIndex]);
        const resource = createAudioResource(songPath);
        player.play(resource);
        
        const embed = new MessageEmbed()
          .setColor('#00ff00')
          .setTitle('Tocando agora:')
          .setDescription(`**${filenames[currentSongIndex]}**`)
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
        
        await entersState(player, AudioPlayerStatus.Idle, 5_000);
        currentSongIndex = (currentSongIndex + 1) % filenames.length;
        await playSong();
      };
      
      await playSong();
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Ocorreu um erro ao reproduzir a música!', ephemeral: true });
    }
  },
};
