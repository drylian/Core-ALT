const { Collection, MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, guildId, clientId } = require('../../Config/config.json');
const lastCommandUsed = {};
const fs = require('fs');
const colors = require('colors');
const logDir = '../';

if (!fs.existsSync(logDir)) {
    console.log(`[${colors.magenta(' LOG ')}] Pasta Logs não existe, Criando uma.`);
    fs.mkdirSync(logDir);
  }
  
  const commandLogStream = fs.createWriteStream(`${logDir}/Comandos.txt`, { flags: 'a' });
  const errorLogStream = fs.createWriteStream(`${logDir}/Erros.txt`, { flags: 'a' });
  const floodLogStream = fs.createWriteStream(`${logDir}/Flood.txt`, { flags: 'a' });
  

// Função para registrar logs de comandos
function logCommand(commandName, userId, userUsername, userDiscriminator) {
    const logMessage = `[${new Date().toLocaleString()}] Comando Slash "/${commandName}" usado pelo usuário ${userUsername}#${userDiscriminator}(${userId})\n`;
    console.log(logMessage);
    commandLogStream.write(logMessage);
  }
  
  // Função para registrar logs de erros
  function logError(commandName, error) {
    const logMessage = `[${new Date().toLocaleString()}] no Comando Slash "/${commandName}" , Erro: ${error.stack}\n`;
    console.log(logMessage);
    errorLogStream.write(logMessage);
  }
  
  // Função para registrar logs fatais
  function logFlood(commandName, userId, userUsername, userDiscriminator) {
    const logMessage = `[${new Date().toLocaleString()}] Comando Slash "/${commandName}" floodado pelo usuário ${userUsername}#${userDiscriminator}(${userId})\n`;
    console.log(logMessage);
    floodLogStream.write(logMessage);
  }

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
            console.log(`${colors.blue('----------')}[${colors.magenta(` ${mainCategory} `)}]${colors.blue('----------')}
[${colors.blue(' SLASH COMANDOS ')}] = ${commands.join(', ')}
[${colors.blue(' SLASH TOTAL ')}] = ${commandsTotal}
${colors.blue('------------------------------------------')}`);
        }

        const rest = new REST({ version: '9' }).setToken(token);

        (async () => {
            try {
                const commands = client.commands.map(command => command.data.toJSON());
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                );
            } catch (error) {
                console.error(error);
            }
        })();

        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;

            const { commandName } = interaction;
            const command = client.commands.get(commandName);

            if (!command) return;

            const currentTime = new Date().getTime();
            const lastTime = lastCommandUsed[interaction.user.id] || 0;
            const elapsedTime = (currentTime - lastTime) / 1000;

            if (elapsedTime < 5) {
                const remainingTime = Math.ceil(5 - elapsedTime);
                logFlood(commandName, interaction.user.id, interaction.user.username, interaction.user.discriminator);
                const embed = new MessageEmbed()
                    .setTitle('Comando usado muito rápido!')
                    .setDescription('Aguarde ``' + remainingTime + '`` segundos antes de usar outro comando!')
                    .setColor('#FF0000');
                await interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            }


            lastCommandUsed[interaction.user.id] = currentTime;

            try {
                await command.execute(interaction);
                logCommand(commandName, interaction.user.id, interaction.user.username, interaction.user.discriminator);
            } catch (error) {
                console.error(error);
                logError(commandName, error);
                const embed = new MessageEmbed()
                    .setTitle('Erro ao usar o comando')
                    .setDescription(`Ocorreu um erro ao usar o comando, esse incidente foi registrado.`)
                    .setColor('#FF0000');
                await interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            }
        });
    }
};