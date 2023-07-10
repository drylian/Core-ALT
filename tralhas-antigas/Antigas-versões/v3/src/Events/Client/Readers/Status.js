const { setIntervalAsync } = require('set-interval-async');
const { config, event } = require('alter');
const colors = require('colors');
const { ActivityType } = require('discord.js');

module.exports = {
    name: 'Status do bot',
    run: async (client) => {
        const typeStyles = {
            Playing: "Jogando",
            Listening: "Escutando",
            Watching: "Ouvindo",
            Competing: "Competindo",
            Streaming: "Gravando"
        };
        const contentlst = 'Playing,Listening,Watching,Competing,Streaming'

        event.log(`[${colors.red(' Ready ')}] ${colors.green('Status')} Ativando...`);
        const statusList = config.status_desc.split(',');
        const TypeList = contentlst.split(',');
        const tempo = parseInt(config.status_tempo);
        let status = 0;
        let index = 0;

        // Definir o primeiro status e tipo aqui
        const firstStatus = statusList[status];
        const firstType = TypeList[index];
        const firstTypeStyle = typeStyles[firstType];
        client.user.setPresence({
            activities: [{
                name: firstStatus,
                type: ActivityType[firstType]
            }]
        });
        event.log(`[${colors.red(' Ready ')}] ${colors.green('Status')} - "${firstTypeStyle} em ${firstStatus}".`);
        index++;
        status++;

        setIntervalAsync(() => {
            if (status >= statusList.length) status = 0;
            const newStatus = statusList[status];

            if (index >= TypeList.length) index = 0;
            const newType = TypeList[index];

            const TypeStyle = typeStyles[newType];
            client.user.setPresence({
                activities: [{
                    name: newStatus,
                    type: ActivityType[newType]
                }]
            });
            event.log(`[${colors.red(' Ready ')}] ${colors.green('Status')} - "${TypeStyle} em ${newStatus}".`);
            index++;
            status++;
        }, tempo);
    }
}