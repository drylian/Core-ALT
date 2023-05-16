const axios = require('axios')
const config = require('../../Config/config.json')

const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nc')
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
      /// PUXA API
      const data = axios({
        url: (config.Nextcloud.API),
        headers: { accept: 'application/json' },
        //          headers: {'NC-Token': 'matheus'},
        auth: {
          username: (config.Nextcloud.Username),
          password: (config.Nextcloud.Password)
        }
      }).then((result) => {
        // console.log(result);
        /// FORMATA RESULTADO
        const totalram = ((result.data.ocs.data.nextcloud.system.mem_total / 1024 + ' ').split('.')[0])
        const ramlivre = ((result.data.ocs.data.nextcloud.system.mem_free / 1024 + ' ').split('.')[0])
        const swap_total = ((result.data.ocs.data.nextcloud.system.swap_total / 1024 + ' ').split('.')[0])
        const swap_free = ((result.data.ocs.data.nextcloud.system.swap_free / 1024 + ' ').split('.')[0])
        const freespace = ((result.data.ocs.data.nextcloud.system.freespace / 1073741824 + ' ').split('.')[0])
        const ramusada = ((totalram - ramlivre + ' ').split('.')[0])
        const swap_usada = ((swap_total - swap_free + ' ').split('.')[0])
        const teste = 0.0
        const CPU = ((result.data.ocs.data.nextcloud.system.cpuload[teste] * 100 + ' ').split('.')[0])
        const CPUCal = ((400 - CPU + ' ').split('.')[0])
        const CPUCal2 = ((CPUCal / 4 + ' ').split('.')[0])
        const CPUResul = ((100 - CPUCal2 + ' ').split('.')[0])
        const usado = ((820.14 - freespace + ' ').split('.')[0])
        const status = result.data.ocs.meta.status === 'ok' ? '✅ ok' : ':x: off'
        let selector_swap
        if (swap_total === '0') {
          selector_swap = `| Total: ${swap_total} MB\n| Livre: ${swap_free} MB\n| Usada: ${swap_usada} MB`
        } else {
          selector_swap = ':x: Desativado'
        }
        /// MONTA RESULTADO EM UMA EMBED

        const embed1 = new Discord.MessageEmbed()
          .setColor('#48ff00')
          .setTitle('NextCloud Status🔐')
          .addFields(
            // 🗃🗂↴
            { name: '⏲ Requisição a cada 3Min', value: '1000 restantes.⏱ Tempo restante: 50H' },
            { name: '⚠️ Status:', value: `${status}`, inline: true },
            { name: '⚙️ Versão:', value: `${result.data.ocs.data.nextcloud.system.version}`, inline: true },
            { name: '🤖 CPU:', value: `${CPUResul} %`, inline: true },
            // { name: '\u200B', value: '\u200B' },
            { name: '📂 Espaço', value: `| Total: 820 GB\n| Livre: ${freespace} GB\n| Usado: ${usado} GB`, inline: true },
            // { name: '\u200B', value: '\u200B' },
            { name: '<:12359888removebgpreview21:928305149384990792> Ram', value: `| Total: ${totalram} MB\n| Livre: ${ramlivre} MB\n| Usada: ${ramusada} MB`, inline: true },
            // { name: '\u200B', value: '\u200B' },
            { name: '💱 Swap', value: `${selector_swap}`, inline: true }

          )
        setTimeout(() => {
          msg.edit({ embeds: [embed1] })
        }, 1000)
      }).catch((error) => {
        console.error(error)
        const embed5 = new Discord.MessageEmbed()
          .setTitle("Algo deu errado com NextCloud'-'")
        msg.edit({ embeds: [embed5] })
      });

      /// /LOOP
      (function myLoop (i) {
        setTimeout(function () {
          /// PUXA API
          const data = axios({
            url: (config.Nextcloud.API),
            headers: { accept: 'application/json' },
            //        headers: {'NC-Token': 'matheus'},
            auth: {
              username: (config.Nextcloud.Username),
              password: (config.Nextcloud.Password)
            }
          }).then((result) => {
            /// FORMATA RESULTADO
            const totalram = ((result.data.ocs.data.nextcloud.system.mem_total / 1024 + ' ').split('.')[0])
            const ramlivre = ((result.data.ocs.data.nextcloud.system.mem_free / 1024 + ' ').split('.')[0])
            const swap_total = ((result.data.ocs.data.nextcloud.system.swap_total / 1024 + ' ').split('.')[0])
            const swap_free = ((result.data.ocs.data.nextcloud.system.swap_free / 1024 + ' ').split('.')[0])
            const freespace = ((result.data.ocs.data.nextcloud.system.freespace / 1073741824 + ' ').split('.')[0])
            const ramusada = ((totalram - ramlivre + ' ').split('.')[0])
            const swap_usada = ((swap_total - swap_free + ' ').split('.')[0])
            const temprestante = ((i * 3 / 60 + ' ').split('.')[0])
            const teste = 0.0
            const CPU = ((result.data.ocs.data.nextcloud.system.cpuload[teste] * 100 + ' ').split('.')[0])
            const CPUCal = ((400 - CPU + ' ').split('.')[0])
            const CPUCal2 = ((CPUCal / 4 + ' ').split('.')[0])
            const CPUResul = ((100 - CPUCal2 + ' ').split('.')[0])
            const usado = ((820.14 - freespace + ' ').split('.')[0])
            const status = result.data.ocs.meta.status === 'ok' ? '✅ ok' : ':x: off'
            let selector_swap
            if (swap_total === '0') {
              selector_swap = `| Total: ${swap_total} MB\n| Livre: ${swap_free} MB\n| Usada: ${swap_usada} MB`
            } else {
              selector_swap = ':x: Desativado'
            }

            // console.log(temprestante)
            // console.log(result.data.ocs.data.nextcloud.system.version)
            // console.log(totalram)
            // console.log(ramlivre)
            // console.log(swap_total)
            // console.log(swap_free)
            // console.log(freespace)
            // console.log(ramusada)
            // console.log(swap_usada)
            // console.log(CPU)
            // console.log(CPUCal)
            // console.log(CPUCal2)
            // console.log(CPUResul)
            // console.log(usado)
            /// MONTA RESULTADO EM UMA EMBED

            const embed1 = new Discord.MessageEmbed()
              .setColor('#48ff00')
              .setTitle('NextCloud Status🔐')
              .addFields(
                // 🗃🗂↴
                { name: '⏲ Requisição a cada 3Min', value: `${i} restantes.⏱ Tempo restante: ${temprestante}H` },
                { name: '⚠️ Status:', value: `${status}`, inline: true },
                { name: '⚙️ Versão:', value: `${result.data.ocs.data.nextcloud.system.version}`, inline: true },
                { name: '🤖 CPU:', value: `${CPUResul} %`, inline: true },
                // { name: '\u200B', value: '\u200B' },
                { name: '📂 Espaço', value: `| Total: 820 GB\n| Livre: ${freespace} GB\n| Usado: ${usado} GB`, inline: true },
                // { name: '\u200B', value: '\u200B' },
                { name: '<:12359888removebgpreview21:928305149384990792> Ram', value: `| Total: ${totalram} MB\n| Livre: ${ramlivre} MB\n| Usada: ${ramusada} MB`, inline: true },
                // { name: '\u200B', value: '\u200B' },
                { name: '💱 Swap', value: `${selector_swap}`, inline: true }
              )
            /// EDITA EMBED
            setTimeout(() => {
              msg.edit({ embeds: [embed2] })
            }, 1000)
            /// SE OUVER ERRO:
          }).catch((error) => {
            console.error(error)
            const embed6 = new Discord.MessageEmbed()
              .setTitle("Algo deu errado com NextCloud'-'")
            msg.edit({ embeds: [embed6] })
          })
          /// /DELEY
          if (--i) myLoop(i)
        }, 180000)
      })(1000)
    })
  }
}
