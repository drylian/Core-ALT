const axios = require('axios')
const config = require('../../Config/config.json')
const { SlashCommandBuilder } = require('@discordjs/builders')
const folderPath = 'Externo/Backup';
//const nextcloud = require('nextcloud');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('backup')
    .setDescription('Mostra detalhes do backup da SeventyHost'),
  async execute(interaction) {
    const Discord = require('discord.js')

    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      console.log(`[ ⚠️   ] ${interaction.user.username}#${interaction.user.discriminator} tentou executar o comando cloud sem ter permissão.`)
      return interaction.reply({ content: 'Você não tem permissão para executar este comando!', ephemeral: true })
    }
    /// CRIA A EMBED PRINCIPAL DE AGUARDO
    const embed = new Discord.MessageEmbed()
      .setTitle('Aguarde um pouco')
      .setDescription('')
      .setColor('#aa00ff')
    const a = interaction.reply({
      embeds: [embed],
      fetchReply: true
    }).then(msg => {
      const client = new nextcloud({
        url: (config.Nextcloud.URL),
        username: (config.Nextcloud.Username),
        password: (config.Nextcloud.Password)
      });
      client.login((error, result) => {
        if (error) {
          console.log('Error:', error);
          return;
        }
      
        console.log('Token:', result.token);
      });
      




      /*const embed2 = new Discord.MessageEmbed()
        .setColor('#48ff00')
        .setTitle('Minha cloud☁️')
        .setDescription(`Velocidade: ${speed.mbps}MBps`)
        .addFields(
          { name: '📂 Pastas:', value: `↳ [[Animes]](${animes})\n\n↳ [[Uploads]](${up})`, inline: true }
        )
        .setFooter({
          text: `📂 Espaço usado: ${usado} Gb`
        })
      setTimeout(() => {
        msg.edit({ embeds: [embed2] })
      }, 1000)
      */
    }
    )
  }
}