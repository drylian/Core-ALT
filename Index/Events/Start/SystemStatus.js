const Discord = require('discord.js');
const MessageEmbed = require('discord.js').MessageEmbed;
const si = require('systeminformation');
const { config } = require('../../../Settings');
const Config = config;
const fs = require('fs');
const os = require('os');
const https = require('http');
const disk = require('node-disk-info');

module.exports = {
    name: 'ready',
    run: async (client) => {
        if (Config.Start.SystemStatus.Active === true) {
            console.log('[ SystemStatus ] SystemStatus Ativo, iniciando..');
        const channel = client.channels.cache.get(Config.Start.System.Channel);

        const settingsFilePath = './Events/Start/Setup/SystemStatus/mensagem.json';

        // Verifica se o arquivo de configurações existe, se não, cria um novo
        if (!fs.existsSync(settingsFilePath)) {
            fs.writeFileSync(settingsFilePath, JSON.stringify({}));
        }

        // Lê o arquivo de configurações
        let settings = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));

        // Set an interval
        setInterval(async () => {

            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

            //BATERIA
            const bateria = await si.battery();
            let Percent = bateria.percent;
            let ChargeON = bateria.acConnected === true ? 'Conectado' : 'Desconectado';
            let Charging = bateria.isCharging === true ? 'Sim' : 'Não';

            function bytesToGB(bytes) {
                return (bytes / 1024 / 1024 / 1024).toFixed(2);
            }
            // RAM
            const memoria = await si.mem();
            let MaxMemory = bytesToGB(memoria.total);
            let UsedMemory = bytesToGB(memoria.used);
            let FreeMemory = bytesToGB(memoria.free);
            // SWAP
            let MaxSwap = bytesToGB(memoria.swaptotal);
            let UsedSwap = bytesToGB(memoria.swapused);
            let FreeSwap = bytesToGB(memoria.swapfree);
            // Disco Alerta
            disk.getDiskInfo()
                .then((disks) => {
                    disks.forEach((d) => {
                        const usedGB = (d.used / 1024 / 1024 / 1024).toFixed(2);
                        const totalGB = (d.blocks / 1024 / 1024 / 1024).toFixed(2);

                        // Verificações
                        const avisos = [];
                        if (usedGB >= totalGB -  Config.Start.System.Verificadores.Disk) {
                            avisos.push({
                                nome: `💻 Armazenamento "${d.mounted}"`,
                                valor: `↳ ⚙️ O espaço está quase no limite definido. Usado: ${usedGB} GB / Total: ${totalGB} GB`
                            });
                        }

                        if (bateria.acConnected === false) {
                            avisos.push({
                                nome: '🔋 Bateria',
                                valor: '↳ ⚙️ O cabo de Energia não está conectado/funcionando.'
                            });
                        }

                        if (UsedMemory >= MaxMemory - Config.Start.System.Verificadores.RAM) {
                            avisos.push({
                                nome: '💻 RAM',
                                valor: `↳ ⚙️ A ram está quase no limite definido ${UsedMemory}/${MaxMemory}`
                            });
                        }

                        if (UsedSwap >= MaxSwap - Config.Start.System.Verificadores.Swap) {
                            avisos.push({
                                nome: '💻 Swap',
                                valor: `↳ ⚙️ O Swap está quase no limite definido ${UsedSwap}/${MaxSwap}`
                            });
                        }

                        if (avisos.length > 0) {
                            console.log('[ SYSTEM ] Aviso do status foi ativado')
                            const embed = new MessageEmbed()
                                .setTitle('Aviso Sistema')
                                .setColor(randomColor)
                                .setDescription(Config.Start.System.Voce)
                                .setTimestamp();

                            avisos.forEach(aviso => {
                                embed.addFields({ name: aviso.nome, value: aviso.valor });
                            });

                            client.channels.cache.get(Config.Start.System.Logs).send({ embeds: [embed] });
                        }
                    
                    })})

                    // Adiciona Config.Start.System.Timer milissegundos à data e hora atual
                    let now = new Date();

                    const tempo = parseInt(Config.Start.System.Timer);

                    // Adiciona Config.Start.System.Timer milissegundos à data e hora atual
                    let futureTime = new Date(now.getTime() + tempo);

                    // Formata a data e hora futuras em uma string formatada pelo Discord
                    let futureTimeString = `<t:${Math.floor(futureTime.getTime() / 1000)}:R>`;



                    ////////////////////// SPEED TEST /////////////////////////
                    const downloadUrl = 'http://speedtest.tele2.net/10MB.zip';
                    const uploadUrl = 'http://httpbin.org/post';
                    const pingHost = 'www.google.com';
                    const pingPort = 80;
                    const fileSize = 10 * 1024 * 1024; // 10 MB

                    // Mede a velocidade de download
                    function measureDownloadSpeed(uploadSpeed, pingSpeed) {
                        const start = new Date();

                        https.get(downloadUrl, (res) => {
                            const end = new Date();
                            const duration = end - start;
                            const speed = res.headers['content-length'] / (duration / 1000) / 1024 / 1024;
                            measureUploadSpeed(uploadSpeed, pingSpeed, speed);
                        }).on('error', (err) => {
                            console.error(`Erro na requisição de download: ${err.message}`);
                            measureUploadSpeed(uploadSpeed, pingSpeed, null);
                        });
                    }

                    // Mede a velocidade de upload
                    function measureUploadSpeed(uploadSpeed, pingSpeed, downloadSpeed) {
                        const start = new Date();

                        const file = fs.createReadStream('./Events/Start/Setup/SystemStatus/10MB.zip', { highWaterMark: 1024 * 1024, autoClose: true })
                            .on('open', () => {
                                const req = https.request(uploadUrl, { method: 'POST', headers: { 'Content-Length': fileSize } }, (res) => {
                                    const end = new Date();
                                    const duration = end - start;
                                    const speed = fileSize / (duration / 1000) / 1024 / 1024;
                                    measurePing(downloadSpeed, speed, pingSpeed);
                                });
                                file.pipe(req);
                            })
                            .on('error', (err) => {
                                console.error(`Erro ao ler arquivo de teste: ${err.message}`);
                                measurePing(downloadSpeed, null, pingSpeed);
                            });
                    }

                    // Mede a latência de ping
                    function measurePing(downloadSpeed, uploadSpeed, pingSpeed) {
                        const start = new Date();
                        const socket = https.request({ host: pingHost, port: pingPort, path: '/', method: 'HEAD' });

                        socket.on('error', () => {
                            console.error(`Erro na requisição de ping`);
                            printSpeeds(downloadSpeed, uploadSpeed, null);
                        });

                        socket.on('response', () => {
                            const end = new Date();
                            const duration = end - start;
                            printSpeeds(downloadSpeed, uploadSpeed, duration);
                        });

                        socket.end();
                    }

                    // Imprime as velocidades
                    function printSpeeds(downloadSpeed, uploadSpeed, pingSpeed) {


                        ////////////////////// ///////////// /////////////////////////

                        const cpuStat = require('cpu-stat');
                        let CpuSystem;
                        let CpuLoad;
                        const numCores = cpuStat.totalCores();

                        cpuStat.usagePercent((err, percent) => {
                            if (err) {
                                return console.log(err);
                            }

                            CpuLoad = percent.toFixed();
                            printCpu(CpuLoad);
                        });
                        function printCpu(CpuLoad) {
                            if (os.platform() === 'win32') {
                                CpuSystem = ("Windows");
                            } else {
                                CpuSystem = ("linux");
                            }


                            disk.getDiskInfo()
                                .then((disks) => {
                                    disks.forEach((d) => {

                                        let embed = new Discord.MessageEmbed()
                                            .setTitle('Status da Maquina')
                                            .setDescription('⚙️ Informações  | Proxima atualização: ' + futureTimeString)
                                            .setColor(randomColor)
                                            .addFields(
                                                { name: '💻 Sistema', value: '```' + ` ↳ ⚙️ Sistema: ${CpuSystem} \n\ ↳ ⚙️ Núcleos: ${numCores} \n\ ↳ ⚙️ Cpu Usada: ${CpuLoad}%` + '```' },
                                            )
                                            .setTimestamp(new Date());
                                        embed.addFields(
                                            { name: `💻 Armazenamento: ${d.mounted}`, value: '```' + ` ↳ ⚙️ Total: ${(d.blocks / 1024 / 1024 / 1024).toFixed(2)} GB \n\ ↳ ⚙️ Usado: ${(d.used / 1024 / 1024 / 1024).toFixed(2)} GB \n\ ↳ ⚙️ Livre: ${(d.available / 1024 / 1024 / 1024).toFixed(2)} GB` + '```' },
                                        )
                                            .addFields(
                                                { name: '💻 RAM', value: '```' + ` ↳ ⚙️ Total: ${MaxMemory} GB \n\ ↳ ⚙️ Usado: ${UsedMemory} GB \n\ ↳ ⚙️ Livre: ${FreeMemory} GB ` + '```' },
                                                { name: '💻 SWAP', value: '```' + ` ↳ ⚙️ Total: ${MaxSwap} GB \n\ ↳ ⚙️ Usado: ${UsedSwap} GB \n\ ↳ ⚙️ Livre: ${FreeSwap} GB ` + '```' },
                                                { name: '💻 Internet', value: '```' + ` ↳ ⚙️ Download: ${downloadSpeed.toFixed(2)} Mb/s \n\ ↳ ⚙️ Upload: ${uploadSpeed.toFixed(2)} Mb/s \n\ ↳ ⚙️ Ping: ${pingSpeed} ms` + '```' },
                                                { name: '🔋 Bateria', value: '```' + ` ↳ ⚡ Bateria: ${Percent}% \n\ ↳ 🔌 Tomada: ${ChargeON} \n\ ↳ ⚡ Carregando: ${Charging}` + '```' },
                                            )
                                            .setThumbnail(Config.Logo);

                                        // Verifica se há uma mensagem armazenada para esse canal
                                        if (settings[channel.id]) {
                                            // Edita a mensagem anterior com as informações atualizadas
                                            channel.messages
                                                .fetch(settings[channel.id])
                                                .then((msg) => {
                                                    console.log('[ STATUS-SYSTEM ] Atualizado')
                                                    msg.edit({ embeds: [embed] });
                                                })
                                                .catch((error) => {
                                                    console.error(error);
                                                });
                                        } else {
                                            // Envia uma nova mensagem e armazena o ID
                                            console.log('[ STATUS-SYSTEM ] Mensagem criada')
                                            channel.send({ embeds: [embed] }).then((msg) => {
                                                settings[channel.id] = msg.id;
                                                fs.writeFileSync(settingsFilePath, JSON.stringify(settings));
                                            });
                                        }
                                    })
                                }
                                )
                        }
                    }

                    measureDownloadSpeed(null, null);
                }, Config.Start.System.Timer);
            } else {
                    console.log('[ SystemStatus ] SystemStatus desativado, pulando...');
            }
        }
};
