const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
const client = require('../../bot'); // importar o objeto client
const { Database } = require("simpl.db");
const path = "../../database.json"; // caminho para o arquivo de banco de dados
client.db = new Database(path);
const config = require('../../Config/config.json');
const ptero = require('lmadactyl')
const { format } = require('date-fns');
const now = new Date();
const date = format(now, "'hoje, às' HH:mm 'do dia' dd 'de' MMMM", {
    locale: require('date-fns/locale/pt-BR'),
});
const token = config.pterodactyl.token;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('criarservidor')
        .setDescription('Cria um servidor gratuito'),
    async execute(interaction) {

        const createServerNodeID = parseInt(config.pterodactyl.CreateServerNodeID);


        const api = axios.create({
            baseURL: config.pterodactyl.url,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            },
        });
        
        // Gerenciar Sistema
        const nodeInfo = await api.get(`/api/application/nodes/${createServerNodeID}`);
        const serverInfo = await api.get(`/api/application/nodes/${createServerNodeID}/allocations`);
        // Busca na Api usado em GET
        const UseMemory = nodeInfo.data.attributes.allocated_resources.memory;
        const MaxMemory = nodeInfo.data.attributes.memory;
        const UseDisk = nodeInfo.data.attributes.allocated_resources.disk;
        const MaxDisk = nodeInfo.data.attributes.disk;
        const UseServers = serverInfo.data.meta.pagination.count;
        const MaxServers = serverInfo.data.meta.pagination.total;

        if (UseServers >= MaxServers) {

            const embed = new MessageEmbed()
                .setColor(randomColor)
                .setTitle('Não foi possível criar o servidor')
                .setDescription(`O node já está com a quantidade máxima de servidores alocados (${MaxServers}).`)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
            return;

        } else if (UseMemory >= MaxMemory - 1024) {
            const embed = new MessageEmbed()
                .setColor(randomColor)
                .setTitle('Não foi possível criar o servidor')
                .setDescription(`O node não tem Ram suficiente para alocar mais servidores.`)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
            return;
        } else if (UseDisk >= MaxDisk - 1024) {
            const embed = new MessageEmbed()
                .setColor(randomColor)
                .setTitle('Não foi possível criar o servidor')
                .setDescription(`O node não tem espaço suficiente para alocar mais servidores.`)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
            return;
        }

        const authorId = interaction.user.id;
        const hasSim = client.db.has('sim.' + authorId);
        const serverStatus = client.db.get('server.' + authorId);
        if (!hasSim) {
            return interaction.reply({ embeds: [new MessageEmbed().setColor('#303138').setDescription(config.emoji.alert + ` **|** Crie uma conta usando o comando \`/ [seu email]\``).setTitle(config.emoji.alert + ` | Crie uma conta antes!`)] });
        }

        if (serverStatus === '1') {
            let botoes = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setEmoji('963592169061490758')
                        .setLabel('Acessar o Website')
                        .setURL(config.Info.Website),
                )
            const embed = new MessageEmbed()
                .setTitle('Aviso')
                .setDescription(config.emoji.alert + ` **|** Você ja possue um servidor Gratuito!`)
                .addFields(
                    { name: 'Aviso', value: 'Limite de servidores gratuitos, caso queira criar mais um servidor, compre no nosso site ' }
                )
                .setThumbnail(config.Logo)
                .setImage(config.footer.image)
                .setFooter({
                    text: (date),
                    iconURL: (config.footer.icon),
                })
                .setColor(randomColor);

            return interaction.reply({ embeds: [embed], components: [botoes] });
        }

        const embed = new MessageEmbed().setTitle(config.emoji.server + ` **|** Criar Servidor - \`${interaction.user.username}\``).setDescription(config.emoji.alert + ` **|** \`Escolha o tipo do servidor que você quer!\``).setColor('#303138');
        const selectMenu = new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Escolha um Servidor')
            .addOptions([
                // Gerenciador do Select
                //{emoji: '964186677503463554',label: 'Javascript',value: 'js'},
                {emoji: '964186705856974928',label: 'Python',value: 'py'},
                {emoji: '964186771070005290',label: 'Java',value: 'jda'},
                {emoji: '1091149029632651325',label: 'Mindustry',value: 'min'},
                //{emoji: '964373724386197554',label: 'Ruby',value: 'rb'},
                //{emoji: '964374184299999272',label: 'GO',value: 'go'},
                //{emoji: '964377811840274432',label: 'Crystal',value: 'cr'},
                //{emoji: '964379306639917056',label: 'LUA',value: 'lua'},
                //{emoji: '964377758434209882',label: 'PHP',value: 'php'},
                //{emoji: '964379765018595348',label: 'Deno',value: 'dn'},
                //{emoji: '964379264046727188',label: 'Dotnet',value: 'net'},
                //{emoji: '964380339395002378',label: 'Mono',value: 'mono'},
            ]);
        try {
            let botoes = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setEmoji('963592169061490758')
                        .setLabel('Acessar o Painel')
                        .setURL(config.pterodactyl.link),
                )
            const actionRow = new MessageActionRow().addComponents(selectMenu);

            await interaction.reply({ embeds: [embed], components: [actionRow] });

            const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === authorId;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async (collected) => {
                collected.deferUpdate();

                const value = collected.values[0];
                let image = '';
                let bot = {};
                if (value === `min`) {
                    image = 'https://cdn.discordapp.com/emojis/1091149029632651325.png'
                    bot = ({ "name": `[MINDUSTRY] - (${interaction.user.username})`, "user": client.db.get(`id.${interaction.user.id}`), "egg": 34, "docker_image": "ghcr.io/parkervcp/yolks:java_11", "startup": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar server-release.jar config port {{SERVER_PORT}},config name {{SERVER_NAME}},host {{MAPNAME}}", "environment": { "VERSION": "latest", "SERVER_NAME": "A Pterodactyl Hosted Server", "MAPNAME": "Tendrils" }, "limits": { "memory": 150, "swap": -1, "disk": 1024, "io": 500, "cpu": 50 }, "feature_limits": { "databases": 1, "allocations": 1, "backups": 10 }, "deploy": { "locations": [1], "dedicated_ip": false, "port_range": [] }, "start_on_completion": true, "oom_disabled": true })
                }
                if (value === `js`) {
                    image = 'https://cdn.discordapp.com/attachments/959273487690784789/964195221984391218/js.png'
                    bot = ({ "name": `[BOT-JS] - (${interaction.user.username})`, "user": client.db.get(`id.${interaction.user.id}`), "egg": 33, "docker_image": "ghcr.io/parkervcp/yolks:nodejs_16", "startup": 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/node /home/container/JS_FILE}}', "limits": { "memory": 100, "swap": -1, "disk": 1024, "io": 500, "cpu": 50 }, "environment": { "JS_FILE": "index.js", "USER_UPLOAD": "1", "AUTO_UPDATE": "1" }, "feature_limits": { "databases": 1, "allocations": 1, "backups": 10 }, "deploy": { "locations": [1], "dedicated_ip": false, "port_range": [] }, "start_on_completion": true, "oom_disabled": false })
                }
                if (value === `py`) {
                    image = 'https://cdn.discordapp.com/emojis/964186705856974928.png'
                    bot = ({ "name": `[BOT-PY] - (${interaction.user.username})`, "user": client.db.get(`id.${interaction.user.id}`), "egg": 32, "docker_image": "ghcr.io/parkervcp/yolks:python_3.10", "startup": 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z {{PY_PACKAGES}} ]]; then pip install -U --prefix .local {{PY_PACKAGES}}; fi; if [[ -f /home/container/${REQUIREMENTS_FILE} ]]; then pip install -U --prefix .local -r ${REQUIREMENTS_FILE}; fi; /usr/local/bin/python /home/container/{{PY_FILE}}', "limits": { "memory": 100, "swap": -1, "disk": 1024, "io": 500, "cpu": 50 }, "environment": { "PY_FILE": "main.py", "USER_UPLOAD": "1", "AUTO_UPDATE": "1", "REQUIREMENTS_FILE": "requirements.txt" }, "feature_limits": { "databases": 1, "allocations": 1, "backups": 10 }, "deploy": { "locations": [1], "dedicated_ip": false, "port_range": [] }, "start_on_completion": true, "oom_disabled": false })
                }
                if (value === `rb`) {
                    image = 'https://cdn.discordapp.com/attachments/959273487690784789/964403205448556594/BP_ruby.png'
                    bot = ({ "name": `[BOT-RUBY] - (${interaction.user.username})`, "user": client.db.get(`id.${interaction.user.id}`), "egg": 34, "docker_image": "quay.io\/yajtpg\/pterodactyl-images:ruby-3.1", "startup": 'then bundle install -U --prefix .local {{PACKAGE}};bundle exec ruby {EXECUTABLE}', "limits": { "memory": 100, "swap": -1, "disk": 1024, "io": 500, "cpu": 50 }, "environment": { "EXECUTABLE": "main.rb", "PACKAGE": "", "USER_UPLOAD": "1", "AUTO_UPDATE": "1" }, "feature_limits": { "databases": 1, "allocations": 1, "backups": 10 }, "deploy": { "locations": [1], "dedicated_ip": false, "port_range": [] }, "start_on_completion": true, "oom_disabled": false })
                }
                if (value === `mono`) {
                    image = 'https://cdn.discordapp.com/emojis/964380339395002378.png'
                    bot = ({ "name": `[MOMO] - (${interaction.user.username})`, "user": client.db.get(`id.${interaction.user.id}`), "egg": 28, "docker_image": "quay.io/yajtpg/pterodactyl-images:mono-6.12", "startup": '/start.sh', "limits": { "memory": 100, "swap": -1, "disk": 1024, "io": 500, "cpu": 50 }, "environment": { "STARTUP_CMD": "oi.cs", "SECOND_CMD": "oi2.cs", "USER_UPLOAD": "1", "AUTO_UPDATE": "1" }, "feature_limits": { "databases": 1, "allocations": 1, "backups": 10 }, "deploy": { "locations": [1], "dedicated_ip": false, "port_range": [] }, "start_on_completion": true, "oom_disabled": true })
                }
                if (value === `go`) {
                    image = 'https://cdn.discordapp.com/emojis/964374184299999272.png'
                    bot = ({ "name": `[BOT-GO] - (${interaction.user.username})`, "user": client.db.get(`id.${interaction.user.id}`), "egg": 33, "docker_image": "quay.io/yajtpg/pterodactyl-images:go-1.17", "startup": './${EXECUTABLE}', "limits": { "memory": 100, "swap": -1, "disk": 1024, "io": 500, "cpu": 50 }, "environment": { "EXECUTABLE": "main.go", "GO_PACKAGE": "", "USER_UPLOAD": "1", "AUTO_UPDATE": "1" }, "feature_limits": { "databases": 1, "allocations": 1, "backups": 10 }, "deploy": { "locations": [1], "dedicated_ip": false, "port_range": [] }, "start_on_completion": true, "oom_disabled": false })
                }
                if (value === `cr`) {
                    image = 'https://cdn.discordapp.com/emojis/964377811840274432.png'
                    bot = ({ "name": `[BOT-CRYSTAL] - (${interaction.user.username})`, "user": client.db.get(`id.${interaction.user.id}`), "egg": 22, "docker_image": "quay.io/yajtpg/pterodactyl-images:crystal-1.0.0", "startup": '/start.sh', "limits": { "memory": 100, "swap": -1, "disk": 1024, "io": 500, "cpu": 50 }, "environment": { "STARTUP_CMD": "oi.cr", "SECOND_CMD": "oi2.cr", "USER_UPLOAD": "1", "AUTO_UPDATE": "1" }, "feature_limits": { "databases": 1, "allocations": 1, "backups": 10 }, "deploy": { "locations": [1], "dedicated_ip": false, "port_range": [] }, "start_on_completion": true, "oom_disabled": false })
                }
                if (value === `net`) {
                    image = 'https://cdn.discordapp.com/emojis/964379264046727188.png'
                    bot = ({ "name": `[BOT-NET] - (${interaction.user.username})`, "user": client.db.get(`id.${interaction.user.id}`), "egg": 20, "docker_image": "quay.io/yajtpg/pterodactyl-images:dotNET-6.0", "startup": '/start.sh', "limits": { "memory": 100, "swap": -1, "disk": 1024, "io": 500, "cpu": 50 }, "environment": { "STARTUP_CMD": "oi.net", "SECOND_CMD": "oi2.net", "USER_UPLOAD": "1", "AUTO_UPDATE": "1" }, "feature_limits": { "databases": 1, "allocations": 1, "backups": 10 }, "deploy": { "locations": [1], "dedicated_ip": false, "port_range": [] }, "start_on_completion": true, "oom_disabled": false })
                }
                if (value === `jda`) {
                    image = 'https://cdn.discordapp.com/emojis/964186771070005290.png'
                    bot = ({ "name": `[BOT-JDA] - (${interaction.user.username})`, "user": client.db.get(`id.${interaction.user.id}`), "egg": 33, "docker_image": "ghcr.io/parkervcp/yolks:java_11", "startup": "java -Dterminal.jline=false -Dterminal.ansi=true -jar {{JARFILE}}", "environment": { "JARFILE": "main.jar" }, "limits": { "memory": 100, "swap": -1, "disk": 1024, "io": 500, "cpu": 50 }, "feature_limits": { "databases": 1, "allocations": 1, "backups": 10 }, "deploy": { "locations": [1], "dedicated_ip": false, "port_range": [] }, "start_on_completion": true, "oom_disabled": true })
                }
                if (value === `lua`) {
                    image = 'https://cdn.discordapp.com/emojis/964379306639917056.png'
                    bot = ({ "name": `[BOT-LUA] - (${interaction.user.username})`, "user": client.db.get(`id.${interaction.user.id}`), "egg": 31, "docker_image": "quay.io/yajtpg/pterodactyl-images:lua-5.4", "startup": './luvit {{LUA_FILE}}', "limits": { "memory": 100, "swap": -1, "disk": 1024, "io": 500, "cpu": 50 }, "environment": { "LUA_FILE": "bot.lua", "LIT_PACKAGES": "", "USER_UPLOAD": "1", "AUTO_UPDATE": "1" }, "feature_limits": { "databases": 1, "allocations": 1, "backups": 10 }, "deploy": { "locations": [1], "dedicated_ip": false, "port_range": [] }, "start_on_completion": true, "oom_disabled": false })
                }
                if (value === `php`) {
                    image = 'https://cdn.discordapp.com/emojis/964377758434209882.png'
                    bot = ({ "name": `[PHP] - (${interaction.user.username})`, "user": client.db.get(`id.${interaction.user.id}`), "egg": 25, "docker_image": "quay.io/yajtpg/pterodactyl-images:php-8.1", "startup": '/start.sh', "limits": { "memory": 100, "swap": -1, "disk": 1024, "io": 500, "cpu": 50 }, "environment": { "STARTUP_CMD": "oi.php", "SECOND_CMD": "oi2.php", "USER_UPLOAD": "1", "AUTO_UPDATE": "1" }, "feature_limits": { "databases": 1, "allocations": 1, "backups": 10 }, "deploy": { "locations": [1], "dedicated_ip": false, "port_range": [] }, "start_on_completion": true, "oom_disabled": false })
                }
                if (value === `dn`) {
                    image = 'https://cdn.discordapp.com/emojis/964379765018595348.png'
                    bot = ({ "name": `[BOT-DENO] - (${interaction.user.username})`, "user": client.db.get(`id.${interaction.user.id}`), "egg": 24, "docker_image": "quay.io/yajtpg/pterodactyl-images:deno-1.17.1", "startup": '/start.sh', "limits": { "memory": 100, "swap": -1, "disk": 1024, "io": 500, "cpu": 50 }, "environment": { "STARTUP_CMD": "oi.dn", "SECOND_CMD": "oi2.dn", "USER_UPLOAD": "1", "AUTO_UPDATE": "1" }, "feature_limits": { "databases": 1, "allocations": 1, "backups": 10 }, "deploy": { "locations": [1], "dedicated_ip": false, "port_range": [] }, "start_on_completion": true, "oom_disabled": true })
                };

                const response = await ptero.application.createServer(config.pterodactyl.link, config.pterodactyl.token, bot)

                if (response.error) {
                    return interaction.editReply({
                        embeds: [new MessageEmbed()
                            .setTitle(config.emoji.alert + ` **|** Erro ao criar servidor!`)
                            .setDescription(`\`\`\`${response.error}\`\`\``)]
                    })
                        .setThumbnail(config.Logo)
                        .setImage(config.footer.image)
                        .setFooter({
                            text: (date),
                            iconURL: (config.footer.icon),
                        })
                        .setColor(randomColor);
                }

                client.db.set(`server.${authorId}`, '1');

                const embed2 = new MessageEmbed()
                    .setTitle(config.emoji.check + ` **|** Servidor criado com sucesso!`)
                    .setDescription(config.emoji.check + ` **|** Acesse o painel com o botão abaixo para ver seu servidor.`)
                    .setThumbnail(config.Logo)
                    .setImage(config.footer.image)
                    .setFooter({
                        text: (date),
                        iconURL: (config.footer.icon),
                    })
                    .setColor(randomColor);

                interaction.editReply({ embeds: [embed2], components: [botoes] });
            });
        } catch (e) {
            if (e.message.includes("Não foi possível encontrar nodes que satisfizessem os requisitos especificados para a implantação automática.")) {
                const embed = new MessageEmbed()

                    .setColor(randomColor)
                    .setTitle(`Registro`)
                    .setDescription(config.emoji.alert + ` **|** O Node do painel não possue os requisitos para implantação de portas.`)
                    .setThumbnail(config.Logo)
                    .setImage(config.footer.image)
                    .setFooter({
                        text: (date),
                        iconURL: (config.footer.icon),
                    });


                return interaction.reply({ embeds: [embed] });
            } else {
                const embed = new MessageEmbed()

                    .setColor(randomColor)
                    .setDescription(config.emoji.alert + ` **|** Houve um erro ao criar o servidor. Por favor, tente novamente mais tarde.\n\`${e.message}\``)
                    .setThumbnail(config.Logo)
                    .setImage(config.footer.image)
                    .setFooter({
                        text: (date),
                        iconURL: (config.footer.icon),
                    });


                return interaction.reply({ embeds: [embed] });
            }
        }
    },
};
