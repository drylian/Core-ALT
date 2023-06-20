const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const radioDataFile = require('../radio.json');

async function createSelectMenu(interaction) {
    return new Promise(async (resolve, reject) => {
        const selectOptions = radioDataFile.map((radio) => ({
            label: radio.name,
            value: radio.id,
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
        const collector = interaction.channel.createMessageComponentCollector({ filter });

        collector.on('collect', async (interaction) => {
            if (interaction.isSelectMenu()) {
                const selectedRadio = interaction.values[0];
                console.log('Estação de rádio selecionada:', selectedRadio);

                await interaction.deferUpdate();
                collector.stop();
                resolve(selectedRadio);
            }
        });

        collector.on('end', () => {
            reject(new Error('Nenhuma estação de rádio selecionada.'));
        });
    });
}

module.exports = { createSelectMenu };
