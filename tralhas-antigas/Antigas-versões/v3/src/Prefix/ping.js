const discord = require ("discord.js");
const { config }= require('alter')

module.exports.run = (client, message, args) =>{
    message.channel.send ('pong!')
}

module.exports.details = {
    name: 'Ping',
    author: 'LachlanDev#8014',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'Ping / Pong!',
    usage:`${config.prefix}ping`
}