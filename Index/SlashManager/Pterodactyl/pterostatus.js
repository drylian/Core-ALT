const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { config } = require('../../../Settings');
const { format } = require('date-fns');
const axios = require('axios');


const now = new Date();
const date = format(now, "'hoje, às' HH:mm 'do dia' dd 'de' MMMM", {
    locale: require('date-fns/locale/pt-BR'),
});

const token = config.Slash.pterodactyl.token;
const application = config.Slash.pterodactyl.url + '/api/application/';

const nodeStats = new Promise((resolve, reject) => {
    axios(application + 'nodes?include=servers,location,allocations', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }).then((res) => {
        const nodes = res.data.data.map((node) => {
            return axios(application + 'nodes/' + node.attributes.id + '/configuration', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            }).then((data) => {
                const body = {
                    id: node.attributes.id,
                    name: node.attributes.name,
                    location: node.attributes.relationships.location.attributes.short,
                    allocations: node.attributes.relationships.allocations.data.length,
                    maintenance: node.attributes.maintenance_mode,
                    total_servers: node.attributes.relationships.servers.data.length,
                    memory_min: node.attributes.allocated_resources.memory,
                    memory_max: node.attributes.memory,
                    disk_min: node.attributes.allocated_resources.disk,
                    disk_max: node.attributes.disk,
                }
                return body;
            }).catch((err) => reject(err));
        });
        Promise.all(nodes).then((data) => {
            resolve(data);
        }).catch((err) => reject(err));
    }).catch((err) => reject(err));
});


module.exports = {
    data: new SlashCommandBuilder()
        .setName('pterostatus')
        .setDescription('Mostra o status dos nodes do Pterodactyl'),
    async execute(interaction) {
        try {
            // Obter informações dos nodes
            const nodesRes = await axios.get(`${application}nodes`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const nodes = nodesRes.data.data;

            const embed = new MessageEmbed()
                .setTitle(`Status do Pterodactyl`)
                .addFields(
                    { name: 'Nodes configurados', value: `${nodes.length}` },
                )
                .setThumbnail(config.Logo)
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
            const row = new MessageActionRow().addComponents(button);
            // Adicionar informações dos nodes ao embed
            nodeStats.then((data) => {
                data.forEach((node) => {
                    const storageMinGB = node.disk_min / 1024;
                    const storageMaxGB = node.disk_max / 1024;
                    const ramMinGB = node.memory_min / 1024;
                    const ramMaxGB = node.memory_max / 1024;
                    embed.addFields(
                        { name: `Node ${node.id}`, value: `**${node.name}**` },
                        { name: '```Servidores```', value: `${node.total_servers}` },
                        { name: '```Espaço de armazenamento```', value: `${storageMinGB.toFixed(2)}GB / ${storageMaxGB.toFixed(2)}GB` },
                        { name: '```RAM```', value: `${ramMinGB.toFixed(2)}GB / ${ramMaxGB.toFixed(2)}GB` },
                        { name: '```Localização```', value: `${node.location}` },
                        { name: '```Está em Manutenção?```', value: node.maintenance ? 'Sim' : 'Não' }
                    );
                }
                );


                // Enviar o embed com as informações dos nodes
                interaction.reply({ embeds: [embed], components: [row] });
            }).catch((err) => {
                console.error(err);
                interaction.reply('Ocorreu um erro ao obter as informações dos nodes.');
            });

        } catch (err) {
            console.error(err);
            interaction.reply('Ocorreu um erro ao obter as informações do painel.');
        }
    },
};
