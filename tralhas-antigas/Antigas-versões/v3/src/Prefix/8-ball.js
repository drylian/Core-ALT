const { config } = require('alter');
const axios = require('axios');

module.exports.run = (client, message, args) => {
  if (args === "") {
    message.channel.send("Please ask a question.");
  } else {
    let uri = "https://8ball.delegator.com/magic/JSON/" + args;
    axios.get(uri)
      .then(response => response.data)
      .then(data => {
        message.channel.send(data.magic.answer);
      })
      .catch(error => {
        console.error(error);
      });
  }
};

module.exports.details = {
  name: '8-Ball',
  author: 'LachlanDev#8014',
  icon: 'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
  description: 'Ask the 8-Ball a question!',
  usage: `${config.prefix}8-ball {question}`
};
