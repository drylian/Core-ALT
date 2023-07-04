const colors = require('colors');
function discordInit() {
	return new Promise(async (resolve) => {
		const { Client, GatewayIntentBits } = require('discord.js');
		const client = new Client({ intents: [GatewayIntentBits.Guilds] });

		const { db } = require('alter'); 
		const config = db.get('config');

		client.on('ready', () => {
			console.log(`[ ${colors.magenta('Discord')} ] Logado como ${client.user.tag}!`);
			db.set('discord', { client: client.user });
			module.exports = { client };
		});

		client.on('interactionCreate', async interaction => {
			if (!interaction.isChatInputCommand()) return;

			if (interaction.commandName === 'ping') {
				await interaction.reply('Pong!');
			}
		});

		client.login(config.bot_token);

		resolve(client);
	});
}
module.exports = { discordInit };