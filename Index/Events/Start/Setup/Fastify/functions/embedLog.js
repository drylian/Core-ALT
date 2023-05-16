'use strict'
module.exports = {
    name: 'logEmbed',
    run: async (data) => {
        const { MessageEmbed } = require('discord.js');
        const { config } = require('../../../../../../Settings')
        const Config = config;
        const { client } = require('../../../../../Utils/ClientController')
        const channel = client.channels.get(Config.Start.Fastify.ChannelID);
        try {

            console.log("Solicitação recebida para o EmbedLog");

            console.log(data);

            const { user, name, price, guild, productId } = data;

            // Crie uma nova embed
            const embed = new MessageEmbed()
                .setColor(Config.Start.Fastify.EmbedColor)
                .setTitle('Compra realizada com sucesso!')
                .setDescription('```Uma compra foi realizada no nosso servidor e foi Aprovada com sucesso!```')
                .setThumbnail('https://cdn.discordapp.com/attachments/864381672882831420/1028234365248995368/aprove.gif')
                .addFields(
                    { name: '👤 | Comprador: ', value: `<@${user.id}>`, inline: false },
                    { name: '🛒 | Produto: ', value: name, inline: false },
                    { name: '💵 | Valor: ', value: price.toString(), inline: false },
                    { name: '📆 | Data: ', value: '```' + new Date(Date.now()) + '```', inline: false },
                )

            channel.send({ embeds: [embed] }).catch(console.error);

        } catch (error) {
            console.error(error);
        }
    }
};
