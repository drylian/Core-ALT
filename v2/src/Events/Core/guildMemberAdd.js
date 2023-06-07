const { EmbedBuilder } = require('discord.js');
const { config, cores } = require('alter')

module.exports = {
  name: 'guildMemberAdd',
    run: async (client, member) => {
    const channel = member.guild.channels.cache.get(parseInt(config.events.entry.entrada));
    console.log(channel)
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(cores.red)
      .setTitle(`Bem-vindo(a) ao servidor, ${member.user.username}!`)
      .setDescription('Seja bem-vindo(a) à nossa comunidade!')
      .setThumbnail(member.user.displayAvatarURL());

    channel.send({ embeds: [embed] });
  }
};
