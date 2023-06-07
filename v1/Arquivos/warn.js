const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { config } = require('../../../Settings');

const tags = {
    '1/3': 'Aviso 1/3',
    '2/3': 'Aviso 2/3',
    '3/3': 'Aviso 3/3',
    'ban': 'Banido',
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aviso')
        .setDescription('Adiciona um aviso ao usuário mencionado')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('Usuário para adicionar um aviso')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('razão')
                .setDescription('Razão para o aviso')
                .setRequired(true)),
    async execute(interaction) {

        const member = interaction.options.getMember('usuário');
        const user = member.user;
        const reason = interaction.options.getString('razão');

        // Resto do código vem aqui...
        for (const tag of Object.keys(tags)) {
            if (tag !== "ban") {
                // Verifica se a tag já existe, caso não exista, cria uma nova tag
                let tagExists = false;
                for (const msgEmbed of message.embeds) {
                    if (
                        msgEmbed.title &&
                        msgEmbed.title.includes(tags[tag]) &&
                        msgEmbed.title.includes(user.tag)
                    ) {
                        tagExists = true;
                        break;
                    }
                }

                if (!tagExists) {
                    // Cria a tag com o aviso
                    const embed = new MessageEmbed()
                        .setColor("YELLOW")
                        .setTitle(`${tags[tag]} para ${user.tag}`)
                        .setDescription(`Usuário avisado por ${interaction.user.tag}`)
                        .addFields({ name: "Motivo", value: reason || "Não especificado" })
                        .setThumbnail(config.Logo);

                    await message.edit({ embeds: [...message.embeds, embed] });

                    break;
                }
            } else {
                // Se for um ban, remove todas as outras tags e adiciona a tag de banimento
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle(`Banido ${user.tag}`)
                    .setDescription(`Usuário banido por ${interaction.user.tag}`)
                    .addFields({ name: "Motivo", value: reason || "Não especificado" })
                    .setThumbnail(config.Logo);

                await message.edit({ embeds: [embed] });

                await member.ban({ reason });

                break;
            }
        }

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Aviso")
            .setDescription(`O usuário ${user.tag} recebeu um aviso.`)
            .setThumbnail(config.Logo);

        return await interaction.followUp({ embeds: [embed] });
    },
};
