const { EmbedBuilder } = require('discord.js');
const { config, cores, client } = require('alter')

module.exports = {
  name: "guildMemberAdd"
};

client.on('guildMemberAdd', async (member) => {
  const channel = member.guild.channels.cache.get(config.events.entry.entrada);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor(cores.red)
    .setTitle(`Bem-vindo(a) ao servidor, ${member.user.username}!`)
    .setDescription('Seja bem-vindo(a) à nossa comunidade!')
    .setThumbnail(member.user.displayAvatarURL());

  channel.send({ embeds: [embed] });
}
)
