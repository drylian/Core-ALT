const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { config } = require('../../../Settings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulsa um usuário do servidor')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('Usuário que será expulso')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('motivo')
                .setDescription('Motivo da expulsão')
                .setRequired(false)),
    async execute(interaction) {
        const member = interaction.options.getMember('usuário');
        const reason = interaction.options.getString('motivo') || 'Sem motivo fornecido';

        if (member) {
            if (member.id === interaction.user.id) {
                const embed = new MessageEmbed()
                    .setColor('YELLOW')
                    .setDescription('Você não pode se expulsar do servidor.')
                    .setThumbnail(config.Logo);
                return await interaction.reply({ embeds: [embed], ephemeral: true });
            }

            if (!member.kickable) {
                const embed = new MessageEmbed()
                    .setColor('RED')
                    .setDescription('Não foi possível expulsar o usuário.')
                    .setThumbnail(config.Logo);
                return await interaction.reply({ embeds: [embed], ephemeral: true });
            }

            try {
                await member.kick(reason);
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Expulsão por Slash')
                    .setDescription(`Informação da Expulsão`)
                    .addFields(
                        { name: 'Usuário expulso', value: member.user.tag },
                        { name: 'Motivo', value: reason },
                        { name: 'Data e Hora', value: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) }
                    )
                    .setThumbnail(config.Logo);
                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error(error);
                const embed = new MessageEmbed()
                    .setColor('RED')
                    .setDescription('Ocorreu um erro ao expulsar o usuário.')
                    .setThumbnail(config.Logo);
                await interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } else {
            const embed = new MessageEmbed()
                .setColor('YELLOW')
                .setDescription('Usuário inválido.')
                .setThumbnail(config.Logo);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
