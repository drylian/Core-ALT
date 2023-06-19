const discord = require ("discord.js");
import('dateformat')
const { config }= require('alter')

module.exports.run = (client, message, args) =>{
    const member = message.mentions.members.last() || message.guild.members.cache.get(args) || message.member;
    const info = new discord.EmbedBuilder()
    .setColor('#b434eb')
    .setThumbnail(member.user.avatarURL())
    .setTitle(`User Info - ${member.user.username}`)
    .addField("Username", `${member.user.username}#${member.user.discriminator}`,true)
    .addField("ID",`${member.user.id}`,true)
    .addField("Account Creation", dateformat(`${member.user.createdAt}`, 'dddd, mmmm dS, yyyy'))
    .addField("Joined Server", dateformat(`${member.joinedAt}`, 'dddd, mmmm dS, yyyy'))
    .addField('Roles:', member.roles.cache.map(r => `${r}`).join(' | '), true)
    .setFooter("Made by LachlanDev#8014", "https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe")
    message.channel.send({embed: info })
}

module.exports.details = {
    name: 'User Info',
    author: 'LachlanDev#8014',
    icon:'https://cdn.discordapp.com/avatars/365350852967399454/ce6e6e91fa887aa86e23ef356c9878fe',
    description: 'Sends information about a given user.',
    usage:`${config.prefix}userinfo {@user}`
}