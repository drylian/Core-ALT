const { stopRadio } = require('./steam/StopSteam');
const { createSelectMenu } = require('./CreateSelector');
const { InitRadio } = require('./InitRadio');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const radioDataFile = require('../radio.json');
// const { skipSong } = require('./steam/SkipSteam');

async function SubCommands(interaction) {
    const subcommand = interaction.options.getSubcommand();
    if (subcommand === 'iniciar') {
        const member = interaction.member;
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) {
            const embed = new MessageEmbed()
                .setTitle('Radio')
                .setDescription('Você precisa estar em um canal de voz para reproduzir a estação de rádio.')
                .setColor('#FF0000');
            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        const selectOptions = radioDataFile.map((radio) => ({
            label: radio.name,
            value: radio.id.toString(),
            description: radio.description,
            emoji: radio.emoji,
        }));

        const selectMenu = new MessageSelectMenu()
            .setCustomId('select_radio')
            .setPlaceholder('Selecione a Estação')
            .addOptions(selectOptions);

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Escolha uma estação de rádio')
            .setDescription('Selecione uma estação de rádio no menu abaixo:')
            .addFields(
                { name: 'Opções:', value: 'Selecione a estação desejada' },
            );

        const row = new MessageActionRow().addComponents(selectMenu);

        await interaction.reply({ embeds: [embed], components: [row] });

        const filter = (interaction) => interaction.customId === 'select_radio';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 }); // Defina um tempo limite de 30 segundos

        collector.on('collect', async (interaction) => {
            if (interaction.isSelectMenu()) {
                const selectedRadio = interaction.values[0];
                console.log('Estação de rádio selecionada:', selectedRadio);
                collector.stop();

                // Adie a resposta antes de chamar a função InitRadio
                await interaction.deferReply();

                // Chame a função InitRadio dentro deste bloco de código
                await InitRadio(interaction, selectedRadio, "vazio");
            }
        });

        collector.on('end', () => {
            const embed = new MessageEmbed()
                .setTitle('Radio')
                .setDescription('Você demorou demais para selecionar uma rádio.')
                .setColor('#FF0000');
            interaction.editReply({ embeds: [embed], ephemeral: true });
        });
    } else if (subcommand === 'selecionar') {
        const member = interaction.member;
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) {
            const embed = new MessageEmbed()
                .setTitle('Radio')
                .setDescription('Você precisa estar em um canal de voz para reproduzir a estação de rádio.')
                .setColor('#FF0000');
            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }
        const selectedRadioID = interaction.options.getInteger('id');
        InitRadio(interaction, "vazio", selectedRadioID)
    } else if (subcommand === 'stop') {
        stopRadio(interaction);
        // } else if (subcommand === 'skip') {
        //     skipSong(interaction);
    }
}

module.exports = { SubCommands };