const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { config } = require('../../../Settings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modolento')
        .setDescription('Define um slowmode para um canal')
        .addChannelOption((option) =>
            option.setName('canal')
                .setDescription('O canal para definir o slowmode')
                .setRequired(true))
        .addIntegerOption((option) =>
            option.setName('tempo')
                .setDescription('O tempo em segundos para definir o slowmode(0 irá desativar o Slowmode)')
                .setRequired(true)),
    async execute(interaction) {
        // Verifica se o usuário tem permissão para executar o comando
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Erro ao definir slowmode')
                .setDescription('Você não tem permissão para executar esse comando.')
                .setColor('RED')
                .setThumbnail(config.Logo);
            return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const channel = interaction.options.getChannel('canal');
        const tempo = interaction.options.getInteger('tempo');

        // Verifica se o canal é um canal de voz
        if (channel.type === 'GUILD_VOICE') {
            const errorEmbed = new MessageEmbed()
                .setTitle('Erro ao definir slowmode')
                .setDescription('Não é possível definir o slowmode em um canal de voz.')
                .setColor('RED')
                .setThumbnail(config.Logo);
            return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        // Verifica se o usuário tem permissão para gerenciar o canal
        const memberPermissions = channel.permissionsFor(interaction.member);
        if (!memberPermissions.has('MANAGE_CHANNELS')) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Erro ao definir slowmode')
                .setDescription('Você não tem permissão para gerenciar o canal especificado.')
                .setColor('RED')
                .setThumbnail(config.Logo);
            return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        // Verifica se o usuário está tentando definir o slowmode em um canal onde não é necessário
        if (tempo === 0 && channel.rateLimitPerUser === 0) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Erro ao definir slowmode')
                .setDescription('O slowmode já está desabilitado nesse canal.')
                .setColor('RED')
                .setThumbnail(config.Logo);
            return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        // Verifica se o usuário está tentando definir o slowmode em um canal onde já está definido com o mesmo tempo
        if (channel.rateLimitPerUser === tempo) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Erro ao definir slowmode')
                .setDescription(`O slowmode já está definido com o tempo de ${ tempo } segundos nesse canal.`)
                .setColor('RED')
                .setThumbnail(config.Logo);
            return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        // Define o slowmode no canal
        try {
            await channel.setRateLimitPerUser(tempo, `Slowmode definido por ${interaction.user.tag}`);
            const successEmbed = new MessageEmbed()
                .setTitle('Slowmode definido')
                .setDescription(`O slowmode de ${tempo} segundos foi definido no canal #${channel.name} por ${interaction.user}.`)
                .setColor('GREEN')
                .setThumbnail(config.Logo);
            return await interaction.reply({ embeds: [successEmbed], ephemeral: true });
        } catch (error) {
            const errorEmbed = new MessageEmbed()
                .setTitle('Erro ao definir slowmode')
                .setDescription(`Ocorreu um erro ao definir o slowmode no canal #${channel.name}.`)
                .setColor('RED')
                .setThumbnail(config.Logo);
            return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};