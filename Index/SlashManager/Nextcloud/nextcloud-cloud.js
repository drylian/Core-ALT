const axios = require('axios')
const config = require('../../Config/config.json')
const NetworkSpeed = require('network-speed') // ES5
const testNetworkSpeed = new NetworkSpeed()
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cloud')
    .setDescription('Mostra informações do nextcloud'),
  async execute (interaction) {
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
      const url_speed = (config.Nextcloud.URL + '/index.php/s/uploads/download?path=%2F&files=download')
      const animes = (config.Nextcloud.URL + '/index.php/s/Animes')
      const up = (config.Nextcloud.URL + '/index.php/s/uploads')

      const embed1 = new Discord.MessageEmbed()
        .setColor('#48ff00')
        .setTitle('Minha cloud☁️')
        .setDescription('Velocidade: calculando...')
        .addFields(
          { name: '📂 Pastas:', value: `↳ [[Animes]](${animes})\n\n↳ [[Uploads]](${up})`, inline: true }
        )
        .setFooter('📂 Espaço usado: Esperando API...')
      setTimeout(() => {
        msg.edit({ embeds: [embed1] })
      }, 1000)

      const data = axios({
        url: (config.Nextcloud.API),
        headers: { accept: 'application/json' },
        //          headers: {'NC-Token': 'matheus'},
        auth: {
          username: (config.Nextcloud.Username),
          password: (config.Nextcloud.Password)
        }
      }).then((result) => {
        const freespace = ((result.data.ocs.data.nextcloud.system.freespace / 1073741824 + ' ').split('.')[0])
        console.log(freespace)

        const usado = ((820.14 - freespace + ' ').split('.')[0])
        console.log(usado)

        getNetworkDownloadSpeed()

        async function getNetworkDownloadSpeed () {
          const baseUrl = `${url_speed}`
          const fileSizeInBytes = 25000000
          const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes)
          console.log(speed)

          const embed2 = new Discord.MessageEmbed()
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
        }
      }).catch((err) => {
        console.log(err)
        const embed9 = new Discord.MessageEmbed
          .setTitle("Algo deu errado com o speedtest'-'")
        msg.edit({ embeds: [embed9] })
      })
    }).catch((err) => {
      console.log(err)
      const embed3 = new Discord.MessageEmbed()
        .setTitle("Algo deu muito errado'-'")
      msg.edit({ embeds: [embed3] })
    })
  }
}
