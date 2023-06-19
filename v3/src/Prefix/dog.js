const discord = require("discord.js");
const { config } = require('alter');
const axios = require("axios");

module.exports.run = (client, message, args) => {
  let uri = "https://dog.ceo/api/breeds/image/random";
  axios.get(uri)
    .then(response => response.data)
    .then(data => {
      const dog = new discord.EmbedBuilder()
        .setColor('#b434eb')
        .setTitle('Dog')
        .setImage(data.message)
        .setFooter("Made by LachlanDev#8014", "https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe");
      message.channel.send({ embeds: [dog] });
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports.details = {
  name: 'Dog',
  author: 'LachlanDev#8014',
  icon: 'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
  description: 'Sends a random image of a dog.',
  usage: `${config.prefix}dog`
};
