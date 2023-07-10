const { EmbedBuilder } = require('discord.js');
const { config, cores, client } = require('alter')

module.exports = {
  name: "guildBanAdd"
};
client.on('guildBanAdd', async (member) => {
  console.log(member)
  const channel = member.guild.channels.cache.get(config.events.entry.saida);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor(cores.blue)
    .setTitle(`Tchau, ${member.user.username}!`)
    .setDescription('Banido!')
    .setThumbnail(member.user.displayAvatarURL());

  channel.send({ embeds: [embed] });
}
)
