const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ajuda')
    .setDescription('Mostra a lista de comandos disponíveis'),
  async execute(interaction) {
    const commands = interaction.client.commands;
    const embeds = [];
    const categories = config.categories;

    // Check if the user has the required role for each category
    const canSeeCategory = (category) => {
      if (!category.requiredRole) return true;
      const role = interaction.guild.roles.cache.get(category.requiredRole);
      return role && interaction.member.roles.cache.has(role.id);
    };

    // Create an embed for each category
    for (const category of categories) {
      if (!canSeeCategory(category)) continue;
      const commandsInCategory = commands.filter(command => command.category === category.name);

      if (commandsInCategory.size > 0) {
        const embed = new MessageEmbed()
          .setColor(category.color)
          .setTitle(category.name)
          .setDescription(category.description)
          .setThumbnail(config.Logo);
          for (const command of commandsInCategory.values()) {
            embed.addFields({ name: `/${command.data.name}`, value: command.data.description || 'Sem descrição' });
          }

        embeds.push(embed);
      }
    }

    await interaction.reply({ embeds: embeds });
  },
};
