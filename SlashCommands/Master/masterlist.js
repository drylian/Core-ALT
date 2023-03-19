const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');
const config = require('../../config.json');
const { format } = require('date-fns');

const now = new Date();
const date = format(now, "'hoje, às' HH:mm 'do dia' dd 'de' MMMM", {
  locale: require('date-fns/locale/pt-BR'),
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('masterlist')
    .setDescription('Lista Todos os servidores do painel, Comando de Acesso Restrito.'),
  async execute(interaction) {
    if (!interaction.member.tags || !interaction.member.tags.includes(config.Master)) {
      await interaction.reply('Você não tem permissão para executar este comando.');
      return;
    }

    try {
      const url = config.pterodactyl.url;
      const token = config.pterodactyl.token;

      const api = axios.create({
        baseURL: url,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'Application/vnd.pterodactyl.v1+json',
        },
      });

      const response = await api.get('/api/application/servers');

      const servers = response.data.data;

      const embed = new MessageEmbed()
        .setTitle('Lista de servidores')
        .setDescription('Aqui está uma lista dos servidores criados:')
        .setThumbnail(config.Logo)
        .addFields(
          { name: 'Nome', value: servers.map(server => server.attributes.name).join('\n'), inline: true },
          { name: 'ID', value: servers.map(server => server.attributes.id).join('\n'), inline: true },
          { name: 'ID DONO', value: servers.map(server => server.attributes.user).join('\n'), inline: true },
        )
        .setImage(config.footer.image)
        .setFooter({
          text: (date),
          iconURL: (config.footer.icon),
      });
      // Gerar uma cor aleatória
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      // Definir a cor do embed como a cor aleatória gerada
      embed.setColor(`#${randomColor}`);
      const button = new MessageButton()
        .setStyle('LINK')
        .setLabel('Acessar o Painel')
        .setURL(config.pterodactyl.link);
        embed.setColor(`#${randomColor}`);

      const row = new MessageActionRow().addComponents(button);

      await interaction.reply({ embeds: [embed], components: [row] });

      console.log(`[ PTERODACTYL > SERVER-LIST ] O usuário ${interaction.user.tag} listou os servidores criados.`);
    } catch (error) {
      if (error.response) {
        console.error(`[ PTERODACTYL > SERVER-LIST > ERRO ] ${error.response.status} - ${error.response.statusText}`);
      } else {
        console.error('[ PTERODACTYL > SERVER-LIST > ERRO ]', error.message);
      }
      await interaction.reply('Ocorreu um erro ao listar os servidores criados. Tente novamente mais tarde.');
    }
  },
};
