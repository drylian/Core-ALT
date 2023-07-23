const { abbreviate, unabbreviate } = require('util-stunks');
const { Op } = require('sequelize');
const moment = require('moment');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

moment.locale('pt-br');

module.exports = {
    name: 'transações',
    aliases: ['tr', 'transactions', 'transaction', 'trs'],
    description: 'Verifique suas transações ou as de outro usuário.',
    cooldown: 2500,
    usage: '[usuário]',
    run: async (client, message, args) => {
        let User = await client.util.FindUser(args[1], client, message, true);
        let Transactions = [];

        let Page = checkPage(args[0]) || 0;

        if (args[1]) {
            Page = checkPage(args[1]);
            if (isNaN(Page)) Page = 0;
            User = await client.util.FindUser(args[0], client, message, true);
        }

        const Data = await client.mysql.transactions.findAll({
            where: {
                [Op.or]: {
                    received_by: User.id,
                    given_by: User.id
                }
            },
            order: [['given_at', 'DESC']],
            limit: 1000
        }).then(x => x.map(y => y.dataValues));

        for (let i of Data) {
            Transactions.push(transformTransactionToText(i, User, client));
        }

        const Row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('back')
                    .setDisabled(false)
                    .setEmoji('⬅️')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('next')
                    .setDisabled(false)
                    .setEmoji('➡️')
                    .setStyle(ButtonStyle.Secondary)
            );

        const Embed = new EmbedBuilder()
            .setFooter({
                text: `Total de ${Transactions.length.toLocaleString()} transações - ` + message.author.tag,
                iconURL: message.author.displayAvatarURL()
            })
            .setColor(client.config.colors.default)
            .setTimestamp()
            .setTitle(`Transações de ${User.username} - (${Page + 1}/${(Transactions.length % 10) < 6 ? (Math.round(Transactions.length / 10) + 1) : Math.round(Transactions.length / 10)})`)
            .setDescription(Transactions.slice(Page * 10, Page * 10 + 10).join('\n') || 'Nenhuma transação');

        const Message = await client.sendReply(message, {
            content: message.author.toString(),
            embeds: [Embed],
            components: [Row]
        });

        let Filter = interaction => interaction.user.id == message.author.id;
        let Collector = Message.createMessageComponentCollector({
            Filter,
            time: 300000
        });

        Collector.on('collect', async (i) => {
            await i.deferUpdate().catch(e => { null });

            const { customId: id } = i;

            if (id === "back") {
                Page -= 1;
                if (Page <= 0) Page = parseInt((Transactions.length - 1) / 10);
            } else {
                Page += 1;
                if ((Page * 10) > Transactions.length) Page = 0;
            }

            let Embed = Message.embeds[0].data;
            Embed.title = `Transações de ${User.username} - (${Page + 1}/${(Transactions.length % 10) < 6 ? (Math.round(Transactions.length / 10) + 1) : Math.round(Transactions.length / 10)})`;
            Embed.description = Transactions.slice(Page * 10, (Page * 10) + 10).join("\n") || "Nenhuma transação aqui!";
            Message.edit({
                embeds: Message.embeds
            });
        });
    }
};

function checkPage(Page) {
    if (Page) {
        if (Page > 1000 || Page < 1) Page = 0;
        else Page = Page - 1;
    } else Page = 0;

    return parseInt(Page);
}

function transformTransactionToText(Data, User, client) {
    if (Data.source === 1) {
        return `\`${getDateWithoutTime(Data.given_at)}\` ${Data.amount > 0 ? '📥 Recebeu' : '📤 Enviou'} ${Data.amount.toLocaleString()} Coins na recompensa diária`;
    } else if (Data.source === 2) {
        return `\`${getDateWithoutTime(Data.given_at)}\` ${Data.amount > 0 ? '📥 Recebeu' : '  Enviou'} ${Data.amount.toLocaleString()} Coins na recompensa semanal`;
    } else if (Data.source === 3) {
        return `\`${getDateWithoutTime(Data.given_at)}\` ${Data.received_by === User.id ? '📥 Recebeu' : '📤 Enviou'} ${Data.amount.toLocaleString()} Coins ${Data.received_by === User.id ? 'de' : 'para'} \`${Data.received_by == User.id ? Data.given_by_tag : Data.received_by_tag}\` \`(${Data.received_by == User.id ? Data.given_by : Data.received_by})\``;
    } else if (Data.source === 4) {
        return `\`${getDateWithoutTime(Data.given_at)}\` ${Data.received_by === User.id ? '📥 Recebeu' : '📤 Enviou'} ${Data.amount.toLocaleString()} Coins apostando com \`${Data.received_by == User.id ? Data.given_by_tag : Data.received_by_tag}\` \`(${Data.received_by == User.id ? Data.given_by : Data.received_by})\``;
    } else if (Data.source === 5) {
        return `\`${getDateWithoutTime(Data.given_at)}\` ${Data.amount > 0 ? '📥 Recebeu' : '📤 Enviou'} ${Data.amount.toLocaleString().replace('-', '')} Coins ${Data.amount > 0 ? 'na' : 'para'} race`;
    } else if (Data.source === 6) {
        return `\`${getDateWithoutTime(Data.given_at)}\` ${Data.received_by === User.id ? '📥 Recebeu' : '📤 Enviou'} ${Data.amount.toLocaleString().replace('-', '')} Coins ${Data.given_by === User.id ? 'para' : 'da'} rifa`;
    } else if (Data.source === 7) {
        return `\`${getDateWithoutTime(Data.given_at)}\` ${Data.amount > 0 ? '📥 Recebeu' : '📥 Enviou'} ${Data.amount.toLocaleString()} Coins trabalhando`;
    } else {
        return `\`${getDateWithoutTime(Data.given_at)}\` ${Data.amount > 0 ? '📥 Recebeu' : '📤 Enviou'} ${Data.amount.toLocaleString()} Coins de uma transação desconhecida`;
    }
}

function getDateWithoutTime() {
    console.log(Date)
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = String(currentDate.getFullYear());
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        return `${day}_${month}_${year}_${hours}_${minutes}_${seconds}`;
}
