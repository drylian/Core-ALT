
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommands } = require('./radio/utils/SubCommands');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('radio')
    .setDescription('Reproduz músicas de uma estação de rádio')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('iniciar')
        .setDescription('Seleciona uma estação de rádio')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('selecionar')
        .setDescription('Seleciona uma estação de rádio')
        .addIntegerOption((option) => option.setName('id').setDescription('ID da estação de rádio').setRequired(true))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('stop')
        .setDescription('Para a reprodução da estação de rádio')
    ),
    // .addSubcommand((subcommand) =>
    //   subcommand
    //     .setName('skip')
    //     .setDescription('Pula para a próxima música da estação de rádio')
    // ),

  async execute(interaction) {
    SubCommands(interaction)
  },
};

