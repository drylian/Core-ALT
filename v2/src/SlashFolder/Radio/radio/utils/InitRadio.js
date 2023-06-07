const { playRadio } = require('./steam/PlaySteam');
const { removeFileExtension } = require('./FormatName');
// Importar dados das estações de rádio do arquivo JSON
const radioDataFile = require('../radio.json');
const axios = require('axios');
async function InitRadio(interaction, selectedRadioID, RadioID) {
    let status = 'nada';
    let RadioSelected = 'nada';
    if (selectedRadioID === "vazio") {
        status = "2"
    } else if (RadioID === "vazio") {
        status = "1"
    }
    if (status === "1") {
        RadioSelected = selectedRadioID
    } else {
        RadioSelected = RadioID
    }
    console.log(RadioSelected)
    const selectedRadio = radioDataFile.find((radio) => radio.id === RadioSelected);

    const folderURL = selectedRadio.url;

    try {
        const response = await axios.get(folderURL);

        let files = response.data;

        const musicFiles = files.filter((file) => file.type === 'file' && file.name.endsWith('.mp3') || file.name.endsWith('.ogg'));

        if (status === "1") {
            if (musicFiles.length === 0) {
                await interaction.editReply('Não foram encontradas músicas na estação de rádio');
            }
        } else {
            if (musicFiles.length === 0) {
                await interaction.reply('Não foram encontradas músicas na estação de rádio');
            }
        }

        const randomIndex = Math.floor(Math.random() * musicFiles.length);
        const randomMusicFile = musicFiles[randomIndex];
        const musicName = encodeURIComponent(randomMusicFile.name);
        const musicAtual = removeFileExtension(randomMusicFile.name);
        const musicURL = `${folderURL}/${musicName}`;

        playRadio(interaction, musicURL, musicFiles, folderURL, musicAtual, status);
    } catch (error) {
        console.error(error);

        if (status === "1") {
            await interaction.editReply('Ocorreu um erro ao obter a lista de músicas da estação de rádio.');
        } else {
            await interaction.reply('Ocorreu um erro ao obter a lista de músicas da estação de rádio.');
        }
    }
}
module.exports = { InitRadio };
