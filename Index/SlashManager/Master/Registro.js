const client = require('../../bot'); // importar o objeto client
const { Database } = require("simpl.db");
const path = "../../database.json"; // caminho para o arquivo de banco de dados
const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
client.db = new Database(path);
const config = require('../../Config/config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const ptero = require('lmadactyl');
const randomstring = require('randomstring');
const { format } = require('date-fns');
const now = new Date();
const date = format(now, "'hoje, às' HH:mm 'do dia' dd 'de' MMMM", {
    locale: require('date-fns/locale/pt-BR'),
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('registrar')
        .setDescription('Cria uma nova conta de usuário gratuito.')
        .addStringOption(option =>
            option.setName('email')
                .setDescription('O endereço de e-mail usado para criar a conta.')
                .setRequired(true)),
    async execute(interaction) {

        let pass = randomstring.generate({ length: 16 });

        let embed = new MessageEmbed()
            .setColor(randomColor)
            .setDescription(config.emoji.alert + ` **|** Você já possui uma conta em nosso sistema!\n\`Caso isso for um erro abra um suporte!\``)
            .setThumbnail(config.Logo)
            .setImage(config.footer.image)
            .setFooter({
                text: (date),
                iconURL: (config.footer.icon),
            });


        if (client.db.has('account.' + interaction.user.id) === true) {
            return interaction.reply({ embeds: [embed] });
        }

        const email = interaction.options.getString('email');
        let embed1 = new MessageEmbed()
            .setColor(randomColor)
            .setDescription(config.emoji.alert + ` **|** Para criar uma conta use: \`/registrar [email]\``)
            .setThumbnail(config.Logo)
            .setImage(config.footer.image)
            .setFooter({
                text: (date),
                iconURL: (config.footer.icon),
            });


        if (!email) {
            return interaction.reply({ embeds: [embed1] });
        }

        try {
            let botoes = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setEmoji('963592169061490758')
                        .setLabel('Acessar o Painel')
                        .setURL(config.pterodactyl.link + '/auth/login'),
                )
            let a = await ptero.application.createUser(config.pterodactyl.link, config.pterodactyl.token, email, pass, `${interaction.user.id}`, 'Gratuito', 'Usuário');

            client.db.set(`account.${interaction.user.id}`, 'oi');
            client.db.set(`id.${interaction.user.id}`, a.attributes.id);
            client.db.set(`sim.${interaction.user.id}`, 'sim');
            client.db.set(`email.${interaction.user.id}`, email);
            client.db.set(`senha.${interaction.user.id}`, pass);
            const channel = await interaction.guild.channels.create(`rg-${interaction.user.username}`, {
                type: 'GUILD_TEXT',
                topic: `Registro do(a) ${interaction.user.tag}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [Permissions.FLAGS.VIEW_CHANNEL],
                    },
                    {
                        id: interaction.user.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL],
                    },
                ],
                parent: config.pterodactyl.registercategory
            });
            let embed3 = new MessageEmbed()
                .setColor(randomColor)
                .setTitle(`Nova conta criada`)
                .setDescription(`Sua nova conta foi criado com sucesso, olhe o canal ${channel}`)
                .setThumbnail(config.Logo)
                .setImage(config.footer.image)
                .setFooter({
                    text: (date),
                    iconURL: (config.footer.icon),
                });


            await interaction.reply({ embeds: [embed3], components: [botoes] });

            // Adicione este código abaixo da resposta para enviar a embed e a senha para o canal privado
            const privateEmbed = new MessageEmbed()
                .setColor(randomColor)

                .setTitle(`Registro`)
                .setDescription(`**Conta criada!**\nSeus dados de login:\n\`\`\`Email: ${email}\nSenha: ${pass}\`\`\`\n**Observação:** Armazene suas credenciais em um local seguro, elas não serão exibidas novamente.`)
                .setThumbnail(config.Logo)
                .setImage(config.footer.image)
                .setFooter({
                    text: (date),
                    iconURL: (config.footer.icon),
                });


            await channel.send({ embeds: [privateEmbed], components: [botoes] });

        } catch (e) {
            if (e.message.includes("O username já foi tomado")) {
                const embed = new MessageEmbed()

                    .setColor(randomColor)
                    .setTitle(`Registro`)
                    .setDescription(config.emoji.alert + ` **|** Seu id "${interaction.user.id}" ja está cadastrado no painel.`)
                    .setThumbnail(config.Logo)
                    .setImage(config.footer.image)
                    .setFooter({
                        text: (date),
                        iconURL: (config.footer.icon),
                    });


                return interaction.reply({ embeds: [embed] });
            } else if (e.message.includes("O email já foi tomado")) {
                const embed = new MessageEmbed()
                    .setColor(randomColor)
                    .setTitle(`Registro`)
                    .setDescription(config.emoji.alert + ` **|** Este endereço de e-mail já foi cadastrado no painel.`)
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
                    .setDescription(config.emoji.alert + ` **|** Houve um erro ao criar a conta. Por favor, tente novamente mais tarde.\n\`${e.message}\``)
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
