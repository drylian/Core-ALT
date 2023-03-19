const { MessageEmbed } = require('discord.js');

module.exports = (member) => {
    const user = member.user;
    const embed = new MessageEmbed()
        .setTitle('Informações do usuário')
        .addFields(
            { name: 'Nome', value: user.username },
            { name: 'ID', value: user.id },
            { name: 'Entrou no servidor em', value: member.joinedAt.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) },
            { name: 'Conta criada em', value: user.createdAt.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) },
        )
        .setColor('#0099ff')
        .setThumbnail(user.avatarURL({ dynamic: true }))
        .setTimestamp();

        console.log(`[ 🟢   ]Comando Slash /userinfo foi executado, informações de:${member.user.tag}`);
    return embed;
};
