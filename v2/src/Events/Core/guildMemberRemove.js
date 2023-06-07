const { EmbedBuilder } = require('discord.js');
const { config, cores } = require('alter')
module.exports = {
    name: 'guildMemberRemove',
    run: async (client, member) => {
      const channel = member.guild.channels.cache.get(parseInt(config.events.entry.saida));
      console.log(channel)
      if (!channel) return;
  
      const embed = new EmbedBuilder()
        .setColor(cores.blue)
        .setTitle(`Tchau, ${member.user.username}!`)
        .setDescription('Esperamos que volte em breve!')
        .setThumbnail(member.user.displayAvatarURL());
  
      channel.send({ embeds: [embed] });
    }
  };
  