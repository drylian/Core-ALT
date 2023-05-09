const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { config } = require('../../../Settings');
const axios = require('axios');
const { format } = require('date-fns');


const now = new Date();
const date = format(now, "'hoje, às' HH:mm 'do dia' dd 'de' MMMM", {
  locale: require('date-fns/locale/pt-BR'),
});

const url = config.Slash.pterodactyl.url;
const token = config.Slash.pterodactyl.token;


module.exports = {
    data: new SlashCommandBuilder()
        .setName('dashboard')
        .setDescription('Ação Mestre sobre os Servidores do painel.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('lista')
                .setDescription('Lista todos os servidores do painel.')
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('deletar')
                .setDescription('Deleta um servidor.')
                .addStringOption((option) =>
                    option
                        .setName('servidor')
                        .setDescription('ID do servidor a ser deletado.')
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName('motivo')
                        .setDescription('Motivo do deletamento.')
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('suspender')
                .setDescription('Suspender um servidor.')
                .addStringOption((option) =>
                    option
                        .setName('servidor')
                        .setDescription('ID do servidor a ser suspenso.')
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName('motivo')
                        .setDescription('Motivo da suspensão.')
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('cancelar')
                .setDescription('Cancelar a suspensão de um servidor.')
                .addStringOption((option) =>
                    option
                        .setName('servidor')
                        .setDescription('ID do servidor a ter a suspensão cancelada.')
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName('motivo')
                        .setDescription('Motivo de cancelar a suspensão.')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const reason = interaction.options.getString('motivo');
        // Verificação de chave Mestra
        if (interaction.user.id !== config.Master) {
            return await interaction.reply({
                content: 'Este comando é Restrito, Impossivel de usar.',
                ephemeral: true,
            });
        }

        // Aqui inicia a chave mestra dos servidores

        try {
            const command = interaction.options.getSubcommand();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (command === 'lista') {
    const api = axios.create({
        baseURL: url,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'Application/vnd.Slash.pterodactyl.v1+json',
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
        .setURL(config.Slash.pterodactyl.link);
        embed.setColor(`#${randomColor}`);

        const row = new MessageActionRow().addComponents(button);

        await interaction.reply({ embeds: [embed], components: [row] });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

else if (command === 'deletar') {
const serverId = interaction.options.getString('servidor');
const urlServer = `${url}/api/application/servers/${serverId}`;
const serverData = await axios.get(urlServer, {
headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'Application/vnd.Slash.pterodactyl.v1+json',
    },
});

if (!serverData) {
const embedError = new MessageEmbed()
    .setTitle('Erro')
    .setDescription('Não foi possível obter as informações do servidor.')
    .setColor('#FF0000');
return interaction.reply({ embeds: [embedError] });
}

const serverName = serverData.data.attributes.name;

await axios.delete(urlServer, {
headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'Application/vnd.Slash.pterodactyl.v1+json',
    },
});

const embedDeleted = new MessageEmbed()
.setTitle('Servidor deletado')
.setDescription(`O servidor ${serverName} foi deletado.`)
.setColor('#00FF00')
.setThumbnail(config.Logo)
.setImage(config.footer.image)
.setFooter({
    text: (date),
    iconURL: (config.footer.icon),
});
if (interaction) {
    interaction.reply({ embeds: [embedDeleted] });
  } else {
    console.log('A interação não está mais disponível');
  };
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

else if (command === 'suspender') {
            const serverId = interaction.options.getString('servidor');
            const urlServer = `${url}/api/application/servers/${serverId}`;
            const serverData = await axios.get(urlServer, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'Application/vnd.Slash.pterodactyl.v1+json',
                },
            });

            if (!serverData) {
                const embedError = new MessageEmbed()
                    .setTitle('Erro')
                    .setDescription('Não foi possível obter as informações do servidor.')
                    .setColor('#FF0000');
                return interaction.reply({ embeds: [embedError] });
            }

            const serverName = serverData.data.attributes.name;

                const data = {
                    "status":"suspended","suspended":true,
                };

                await axios.post(urlServer + '/suspend', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'Application/vnd.Slash.pterodactyl.v1+json',
                      },
                });

                const embedSuspended = new MessageEmbed()
                    .setTitle('Servidor suspenso')
                    .setDescription(`O servidor ${serverName} foi suspenso.`)
                    .setColor('#00FF00')
                    .addFields({
                        name: 'Motivo',
                        value: reason,
                      })
                      .setThumbnail(config.Logo)
                      .setImage(config.footer.image)
                      .setFooter({
                      text: (date),
                      iconURL: (config.footer.icon),
                      });

                if (interaction) {
                    interaction.reply({ embeds: [embedSuspended] });
                  } else {
                   
                    console.log('A interação não está mais disponível');
                  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    } else if (command === 'cancelar') {
            const serverId = interaction.options.getString('servidor');
            const urlServer = `${url}/api/application/servers/${serverId}`;
            const serverData = await axios.get(urlServer, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'Application/vnd.Slash.pterodactyl.v1+json',
                },
            });

            if (!serverData) {
                const embedError = new MessageEmbed()
                    .setTitle('Erro')
                    .setDescription('Não foi possível obter as informações do servidor.')
                    .setColor('#FF0000');
                return interaction.reply({ embeds: [embedError] });
            }

            const serverName = serverData.data.attributes.name;
                const data = {
                    "status":null,"suspended":false,
                };

                await axios.post(urlServer + '/unsuspend', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'Application/vnd.Slash.pterodactyl.v1+json',
                      },
                });

                const embedUnsuspended = new MessageEmbed()
                    .setTitle('Suspensão cancelada')
                    .setDescription(`A suspensão do servidor ${serverName} foi cancelada.`)
                    .setColor('#00FF00')
                    .addFields({
                        name: 'Motivo',
                        value: reason,
                      })
                      .setThumbnail(config.Logo)
                      .setImage(config.footer.image)
                      .setFooter({
                      text: (date),
                      iconURL: (config.footer.icon),
                      });
                if (interaction) {
                    interaction.reply({ embeds: [embedUnsuspended] });
                  } else {
                    console.log('A interação não está mais disponível');
                  }
            }
        } catch (error) {
            console.error(error);
            const embedError = new MessageEmbed()
                .setTitle('Erro')
                .setDescription('Ocorreu um erro ao executar o comando.')
                .setColor('#FF0000');
            interaction.reply({ embeds: [embedError] });
        }
    },
};      
