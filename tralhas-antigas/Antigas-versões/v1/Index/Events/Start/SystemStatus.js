const Discord = require('discord.js')
const MessageEmbed = require('discord.js').MessageEmbed
const si = require('systeminformation')
const colors = require('colors');
const { config } = require('../../../Settings')
const fs = require('fs')
const axios = require('axios')

module.exports = {
  name: 'ready',
  run: async (client) => {
    if (config.Start.SystemStatus.Active === true) {
        console.log(`[ ${colors.cyan('Eventos')} ]  ${colors.green('SystemStatus')} Ativo, iniciando..`);
    const channel = client.channels.cache.get(config.Start.SystemStatus.Channel)

    const settingsFilePath = './settings.json'

    // Verifica se o arquivo de configurações existe, se não, cria um novo
    if (!fs.existsSync(settingsFilePath)) {
      fs.writeFileSync(settingsFilePath, JSON.stringify({}))
    }

    // Lê o arquivo de configurações
    const settings = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'))

    // Set an interval
    setInterval(async () => {
      /// PUXA API
      const data = axios({
        url: (config.Slash.Nextcloud.API),
        headers: { accept: 'application/json' },
        //          headers: {'NC-Token': 'matheus'},
        auth: {
          username: (config.Slash.Nextcloud.Username),
          password: (config.Slash.Nextcloud.Password)
        }
      }).then((result) => {
        const data2 = axios({
          url: (config.Start.SystemStatus.API)
        }).then((systeminformation) => {
          const batteryCheck = async () => {
            /// FORMATA RESULTADO
            // CPU
            const teste = 0.0
            const CPUcal = Math.floor(result.data.ocs.data.nextcloud.system.cpuload[teste] * 100)
            const CPUResul = 100 - Math.floor((400 - CPUcal) / 4)
            // RAM
            const MaxMemory = bytesToGB(result.data.ocs.data.nextcloud.system.mem_total)
            const FreeMemory = bytesToGB(result.data.ocs.data.nextcloud.system.mem_free)
            const UsedMemory = (MaxMemory - FreeMemory).toFixed(2)
            // SWAP
            const MaxSwap = ((result.data.ocs.data.nextcloud.system.swap_total / 1024 + ' ').split('.')[0])
            const FreeSwap = ((result.data.ocs.data.nextcloud.system.swap_free / 1024 + ' ').split('.')[0])
            const UsedSwap = ((MaxSwap - FreeSwap + ' ').split('.')[0])
            // Storage GB
            const FreeSpace = ((result.data.ocs.data.nextcloud.system.freespace / 1073741824 + ' ').split('.')[0])
            const Disk = ((971 - FreeSpace + ' ').split('.')[0])
            // Storage MB
            const FreeSpaceMB = bytesToGB((result.data.ocs.data.nextcloud.system.freespace + ' ').split('.')[0])
            const DiskMB = ((994642 - FreeSpaceMB + ' ').split('.')[0])
            //
            const Files = (result.data.ocs.data.nextcloud.storage.num_files)
            const FilesCM = ((DiskMB / Files + ' ').split('.')[0])
            // osInfo
            const Kernel = (systeminformation.data.osInfo.kernel)
            const Distro = (systeminformation.data.osInfo.distro)
            const Arch = (systeminformation.data.osInfo.arch)
            const CPU = (systeminformation.data.cpu.brand)
            const CPU_name = (systeminformation.data.cpu.manufacturer)
            const Cores = (systeminformation.data.cpu.cores)

            const Percent = systeminformation.data.battery.percent
            const ChargeON = systeminformation.data.battery.acConnected === true ? 'Conectado' : 'Desconectado'
            const Charging = systeminformation.data.battery.isCharging === true ? 'Sim' : 'Não'

            function bytesToGB (bytes) {
              return (bytes / 1024 / 1024).toFixed(2)
            }
            function bytesToMB (bytes) {
              return (bytes / 1024).toFixed(2)
            }

            if (MaxSwap === '0') {
              SelectorSwap = ` ↳ ⚙️ Total: ${MaxSwap} GB \n\ ↳ ⚙️ Usado: ${UsedSwap} GB \n\ ↳ ⚙️ Livre: ${FreeSwap} GB `
            } else {
              SelectorSwap = '❌ Desativado'
            }

            // Verificações
            const avisos = []
            if (systeminformation.data.battery.acConnected === false) {
              avisos.push({
                nome: '🔋 Bateria',
                valor: '↳ ⚙️ O cabo de Energia não está conectado/funcionando.'
              })
            }
            /*
            if (UsedMemory >= MaxMemory - config.Start.SystemStatus.Verificadores.RAM) {
              avisos.push({
                nome: '💻 RAM',
                valor: `↳ ⚙️ A Ram está quase no limite definido ${UsedMemory}/${MaxMemory}`
              })
            }
            */
            if (CPUResul >= config.Start.SystemStatus.Verificadores.PorcenCPU) {
              avisos.push({
                nome: '🤖 CPU',
                valor: `↳ ⚙️ A CPU tá fritando em! Passou do limite previsto: ${CPUResul}% de 100%`
              })
            }
            if (MaxSwap >= '1') {
              if (UsedSwap >= MaxSwap - config.Start.SystemStatus.Verificadores.Swap) {
                avisos.push({
                  nome: '💻 Swap',
                  valor: `↳ ⚙️ O Swap está quase no limite definido ${UsedSwap}/${MaxSwap}`
                })
              }
            }

            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
            if (avisos.length > 0) {
              console.log('[ SYSTEM ] Aviso do status foi ativado')
              const embed = new MessageEmbed()
                .setTitle('Aviso Sistema')
                .setColor(randomColor)
                .setDescription(config.Start.SystemStatus.Voce)
                .setTimestamp()

              avisos.forEach(aviso => {
                embed.addFields({ name: aviso.nome, value: aviso.valor })
              })

              client.channels.cache.get(config.Start.SystemStatus.Logs).send({ embeds: [embed] })
            }
            // Adiciona config.Start.SystemStatus.Timer milissegundos à data e hora atual
            const now = new Date()

            const tempo = parseInt(config.Start.SystemStatus.Timer)

            // Adiciona config.Start.SystemStatus.Timer milissegundos à data e hora atual
            const futureTime = new Date(now.getTime() + tempo)

            // Formata a data e hora futuras em uma string formatada pelo Discord
            const futureTimeString = `<t:${Math.floor(futureTime.getTime() / 1000)}:R>`

            const embed = new Discord.MessageEmbed()
              .setTitle('Status do Sistema')
              .setDescription('⚙️ Informação do Sistema | Proxima atualização: ' + futureTimeString)
              .setColor(randomColor)
              .addFields(
                { name: '🤖 CPU:', value: '```' + `↳ Processador: ${CPU_name + ' ' + CPU}\n\ ↳ Uso: ${CPUResul} %\n\ ↳ Núcleos: ${Cores}` + '```' },
                { name: '💻 Sistema:', value: '```' + `↳ OS: ${Distro} \n\ ↳ Kernel: ${Kernel} \n\ ↳ Arch: ${Arch}` + '```' },
                { name: '📂 Espaço:', value: '```' + `↳ 📦 Total: 971 GB \n\ ↳ 📂 Livre: ${FreeSpace} GB \n\ ↳ 📁 Usado: ${Disk} GB \n\↳ 📦 Arquivos Hospedados: ${Files} \n\ ↳ 📁 Tamanho Médio: ${FilesCM} Mb` + '```' },
                { name: '💻 RAM', value: '```' + `↳ ⚙️ Total: ${MaxMemory} GB \n\ ↳ ⚙️ Usado: ${UsedMemory} GB \n\ ↳ ⚙️ Livre: ${FreeMemory} GB ` + '```' },
                { name: '💻 SWAP', value: '```' + `${SelectorSwap}` + '```' },
                { name: '🔋 Bateria', value: '```' + `↳ ⚡ Bateria: ${Percent}% \n\ ↳ 🔌 Tomada: ${ChargeON} \n\ ↳ ⚡ Carregando: ${Charging}` + '```' }
                // { name: '🕗 Uptime', value: '```' + ` ↳ 🕰 ${Uptime} Horas` + '```' },
              )
              .setTimestamp(new Date())

            // Verifica se há uma mensagem armazenada para esse canal
            if (settings[channel.id]) {
              // Edita a mensagem anterior com as informações atualizadas
              channel.messages
                .fetch(settings[channel.id])
                .then((msg) => {
                  console.log('[ STATUS-SYSTEM ] Atualizado')
                  msg.edit({ embeds: [embed] })
                })
                .catch((error) => {
                  console.error(error)
                })
            } else {
              // Envia uma nova mensagem e armazena o ID
              console.log('[ STATUS-SYSTEM ] Mensagem criada')
              channel.send({ embeds: [embed] }).then((msg) => {
                settings[channel.id] = msg.id
                fs.writeFileSync(settingsFilePath, JSON.stringify(settings))
              })
            }
          }
          batteryCheck()
        })
      })
    }, config.Start.SystemStatus.Timer)
    } else {
      console.log(`[ ${colors.cyan('Eventos')} ]  ${colors.red('SystemStatus')} desativado. Pulado.`);
    }
  }
}
