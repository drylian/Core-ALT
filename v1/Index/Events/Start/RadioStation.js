const { playRadio } = require('../../SlashManager/Membros/radio/utils/steam/PlaySteam');

const { removeFileExtension } = require('../../SlashManager/Membros/radio/utils/FormatName');
const axios = require('axios');

module.exports = {
    name: 'ready', // O nome do evento que será registrado
    run: async (client) => {
        const channel = client.channels.cache.get(config.Start.SystemStatus.Channel)

        const RadioFilePath = './Index/SlashManager/Membros/radio/utils/LastRadioCommands.json'

        // Verifica se o arquivo de configurações existe, se não, cria um novo
        if (!fs.existsSync(RadioFilePath)) {
            fs.writeFileSync(RadioFilePath, JSON.stringify({}))
        }

        // Lê o arquivo de configurações
        const Radio = JSON.parse(fs.readFileSync(RadioFilePath, 'utf8'))

        // Obter a última estação de rádio selecionada (você precisa implementar essa lógica)
        const lastRadioID = Radio.lastRadioID;

        if (lastRadioID) {
            // Encontrar a estação de rádio pelo ID
            const selectedRadio = radioDataFile.find((radio) => radio.id === lastRadioID);

            if (selectedRadio) {
                const folderURL = selectedRadio.url;

                try {
                    const response = await axios.get(folderURL);

                    let files = response.data;

                    const musicFiles = files.filter((file) => file.type === 'file' && file.name.endsWith('.mp3'));

                    if (musicFiles.length === 0) {
                        console.log('Não foram encontradas músicas na estação de rádio.');
                        return;
                    }

                    const randomIndex = Math.floor(Math.random() * musicFiles.length);
                    const randomMusicFile = musicFiles[randomIndex];
                    const musicName = encodeURIComponent(randomMusicFile.name);
                    const musicAtual = removeFileExtension(randomMusicFile.name);
                    const musicURL = `${folderURL}/${musicName}`;

                    // Reproduzir a estação de rádio
                    playRadio(interaction, musicURL, musicFiles, folderURL, musicAtual);
                } catch (error) {
                    console.error('Ocorreu um erro ao obter a lista de músicas da estação de rádio.', error);
                }
            } else {
                console.log('A estação de rádio selecionada não existe.');
            }
        } else {
            console.log('Nenhuma estação de rádio foi selecionada anteriormente.');
        }

        // Verifica se há uma mensagem armazenada para esse canal
        if (Radio[channel.id]) {
            // Edita a mensagem anterior com as informações atualizadas
            channel.messages.fetch(Radio[channel.id])
                .then((msg) => {
                    console.log('[ RADIO-STATION ] Atualizado');
                    msg.edit({ embeds: [embed] });
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // Envia uma nova mensagem e armazena o ID
            console.log('[ RADIO-STATION ] Mensagem criada');
            channel.send({ embeds: [embed] })
                .then((msg) => {
                    Radio[channel.id] = msg.id;
                    fs.writeFileSync(RadioFilePath, JSON.stringify(Radio));
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    },
};
