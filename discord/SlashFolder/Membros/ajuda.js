const fs = require('fs');
const path = require('path');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

const { config,category, cores } = require('alter');

const json = category;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ajuda')
    .setDescription('Lista todos os comandos disponíveis.'),
    
  async execute(interaction) {
    const categories = json.categories.filter(category => {
      if (category.requiredRole) {
        const role = interaction.guild.roles.cache.find(r => r.id === category.requiredRole);
        return role && interaction.member.roles.cache.has(role.id);
      }
      return true;
    });

    const embeds = [];
    for (const category of categories) {
      const commands = fs.readdirSync(path.resolve(__dirname, '..', category.name))
        .filter(file => file.endsWith('.js') && file !== 'ajuda.js');
      const fields = commands.map(file => {
        const commandName = file.slice(0, -3);
        const command = require(`../${category.name}/${file}`);
        return { name: commandName, value: command.data.description || 'Sem descrição.' };
      });

      if (fields.length === 0) continue;

      const embed = new EmbedBuilder()
        .setTitle(category.name)
        .setDescription(category.description)
        .setColor(cores[category.color])
        .addFields(fields)
        .setThumbnail(config.logo);
      embeds.push(embed);
    }

    if (embeds.length === 0) {
      return interaction.reply({ content: 'Você não tem permissão para ver nenhum comando.', ephemeral: true });
    }

    await interaction.reply({ embeds });
  },
};
