import Discord from 'discord.js';
import intents from './scripts/components/intents'; // Supondo que você tenha o arquivo intents.ts na mesma pasta

const client = new Discord.Client({ 
  intents: intents
});

client.once('ready', () => {
  console.log('Bot está online!');
});

client.on('message', (message) => {
  if (message.content === '!ping') {
    message.channel.send('Pong!');
  }
});

client.login('seu_token_do_discord');
