const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Config/config.json');
const ajudaJson = require('../../Config/categorias.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ajuda')
    .setDescription('Lista todos os comandos disponíveis.'),
    
  async execute(interaction) {
    const categories = ajudaJson.categories.filter(category => {
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

      const embed = new MessageEmbed()
        .setTitle(category.name)
        .setDescription(category.description)
        .setColor(category.color)
        .addFields(fields)
        .setThumbnail(config.Logo);
      embeds.push(embed);
    }

    if (embeds.length === 0) {
      return interaction.reply({ content: 'Você não tem permissão para ver nenhum comando.', ephemeral: true });
    }

    await interaction.reply({ embeds });
  },
};
