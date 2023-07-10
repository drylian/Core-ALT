const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { config } = require('../../../Settings');
const interactionCreate = require('../../Utils/InteractionCreate');
const colors = require('colors');

module.exports = {
    name: 'ready', // O nome do evento que será registrado
    run: async (client) => {
        console.log(`[${colors.magenta(' SLASH ')}] Iniciando Comandos Slash.`);

        client.commands = new Collection();

        // Iterate over each folder in the SlashCommands directory
        const mainCategories = readdirSync('./Index/SlashManager', { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const mainCategory of mainCategories) {
            const commandFiles = readdirSync(`./Index/SlashManager/${mainCategory}`).filter(file => file.endsWith('.js'));
            let commands = [];
            for (const file of commandFiles) {
                const command = require(`../../SlashManager/${mainCategory}/${file}`);
                client.commands.set(command.data.name, command);
                command.category = mainCategory;
                commands.push(command.data.name);
                console.log(`[${colors.cyan(` ${mainCategory} `)}] Slash "${command.data.name}" iniciado.`);
            }

            const commandsTotal = commands.length;
            console.log(`[ ${colors.cyan('Eventos')} ]  ${colors.green('Slash')} - ${colors.magenta(mainCategory)} = ${colors.cyan(commandsTotal)} [ ${colors.green('/' + commands.join(', /'))} ] `);

            const rest = new REST({ version: '10' }).setToken(config.token);

            (async () => {
                try {
                    const commands = client.commands.map(command => command.data.toJSON());
                    console.log(commands)
                    commands.forEach(command => {
                        if (command.options) {
                          console.log(command.options);
                        }
                      });
                      
                    await rest.put(Routes.applicationCommands(config.clientId), { body: commands });
                } catch (error) {
                    console.error(error);
                }
            })();
        }
        client.on(interactionCreate.name, (...args) => interactionCreate.run(client, ...args));
    }
};