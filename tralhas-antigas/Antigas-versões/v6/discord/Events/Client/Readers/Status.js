const { setIntervalAsync } = require('set-interval-async');
const { config, event } = require('alter');
const colors = require('colors');
const { ActivityType, InteractionCollector } = require('discord.js');

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

        event.log(`[${colors.red(' Ready ')}] ${colors.green('Status')} Ativando...`);
        const statusList = config.events.status.desc.split(',');
        const TypeList = config.events.status.type.split(',');
        const tempo = parseInt(config.events.status.tempo);
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