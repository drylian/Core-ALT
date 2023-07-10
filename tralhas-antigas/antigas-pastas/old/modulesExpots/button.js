const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	botaos: (buttons) => {
		const row = new ActionRowBuilder();

		buttons.forEach((button) => {
			const { Label, CustomId, Style } = button;

			row.addComponents(
				new ButtonBuilder()
					.setLabel(Label)
					.setStyle(Style)
					.setCustomId(CustomId)
			);
		});

		const data = new SlashCommandBuilder()
			.setName('apps')
			.setDescription('Envia uma embed com 5 botões.');

		const run = async (client, interaction) => {
			await interaction.reply({
				content: 'Aplicativos',
				components: [row],
			});
		};

		return { data, run };
	},
};
