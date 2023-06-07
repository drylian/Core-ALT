const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { config } = require('../../../Settings');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wash')
    .setDescription('Envia informações sobre como lavar as mãos corretamente'),
  async execute(interaction) {
    // Verifica se o usuário tem permissão para executar o comando
    if (!interaction.member.permissions.has('SEND_MESSAGES')) {
      const errorEmbed = new MessageEmbed()
        .setTitle('Erro ao executar comando')
        .setDescription('Você não tem permissão para executar esse comando.')
        .setColor('RED')
        .setThumbnail(config.Logo);
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const embed = new MessageEmbed()
      .setTitle('Como lavar as mãos corretamente')
      .setDescription('Lavar as mãos é fundamental para evitar a disseminação de doenças, especialmente em tempos de pandemia. Veja como fazer corretamente:')
      .addFields(
        { name: '1. Molhe as mãos', value: 'Molhe suas mãos com água limpa corrente.' },
        { name: '2. Use sabão', value: 'Aplique sabão suficiente para cobrir toda a superfície das mãos.' },
        { name: '3. Esfregue as mãos', value: 'Esfregue as palmas das mãos, entre os dedos e sob as unhas por pelo menos 20 segundos.' },
        { name: '4. Enxágue as mãos', value: 'Enxágue as mãos em água corrente até que todo o sabão seja removido.' },
        { name: '5. Seque as mãos', value: 'Seque as mãos com um papel-toalha limpo ou uma toalha limpa.' },
      )
      .setThumbnail(config.Logo);

    try {
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      if (error.code === 50035) {
        const errorEmbed = new MessageEmbed()
          .setTitle('Erro ao executar comando')
          .setDescription('Você não pode executar este comando em um usuário que possua um cargo mais alto do que você.')
          .setColor('RED')
          .setThumbnail(config.Logo);
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      } else {
        //      
      }
    }
  },
};
