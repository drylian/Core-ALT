const { EmbedBuilder } = require('discord.js');
const { config, cores, client } = require('alter')

module.exports = {
  name: "guildMemberRemove"
};

client.on('guildMemberRemove', async (member) => {
  const channel = member.guild.channels.cache.get(config.events.entry.saida);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor(cores.blue)
    .setTitle(`Tchau, ${member.user.username}!`)
    .setDescription('Esperamos que volte em breve!')
    .setThumbnail(member.user.displayAvatarURL());

  channel.send({ embeds: [embed] });
}
)
