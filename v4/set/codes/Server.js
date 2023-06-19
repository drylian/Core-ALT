const { client } = require('./Client')
const set = require('../system/config.json')

client.on("ready", () => {
  console.log(`logado como ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

// Loga o bot
client.login(set.bot_token)
  .catch((err) => {
    console.error("[ Web - Crash ] Algo deu errado ao se conectar com o bot de aplicação");
    console.error("[ Web - Crash ] Erro da API do Discord:" + err);
    return process.exit();
  })
exports.client = client;