const config = {
    'token': 'MTAwMDk4NjQ5NTcwNTk0ODIxMg.Go5sPY.qWp21rgN-zE7cRkVYL25GbV_uYgH5SfZCGWn6M', // Token do bot
    'Debug': false, // Depuração Total do bot.
    'Master': '428660430412709889', // ID do dono do grupo do discord
    'guildId': '925837612000903251',
    'guildname': 'Alternight',
    'clientId': '1000986495705948212',
    'Logo': 'https://cdn.discordapp.com/attachments/1033486312956768336/1086420783477297203/logo-alternight.png',
    'footer': {
        'icon': 'https://cdn.discordapp.com/attachments/1033486312956768336/1086420783477297203/logo-alternight.png',
        'image': 'https://cdn.discordapp.com/attachments/1033486312956768336/1087122572342206524/Alternight_txt.png'
    },
    'emoji': { // Emojis do servidor
        'alert': '<:3360alert:1090983580395651232>',
        'check': '<:8308checkmark1:1091045783136112670>',
        'server': '<:8308checkmark1:1091045783136112670>'
    },
    'Start': { // Comandos de Inicialização.
        'Fastify': { // Start/Status || Status do bot
            'Active': true, // Ativa / Desativa o comando
            'Porta': '24206',
            'ChannelID': '1090977688505823303',
            'EmbedColor': '0c00ba',
        },
        'Status': { // Start/Status || Status do bot
            'Active': true, // Ativa / Desativa o comando
            'Mensagens': 'Em desenvolvimento.,Criado por Drylian.,Venha para Alternight.,Painel Alternight em criação.',
            'Type': 'PLAYING,WATCHING,LISTENING,PLAYING', // Não altere, seta status 
            'Tempo': '180000' // Tempo em milisegundos
        },
        'Mysql': {
            'Active': false, // Ativa / Desativa o comando
            'Host': '192.168.0.160', // Host do database
            'Username': 'u11_fG7mBBuNwJ', // Username do database
            'Password': 'sqcsieA^f++TVEBfMNg^NNjK', // Password do database
            'Database': 's11_Alternightbot', // Nome do database
            'Port': '3306' // Porta do database
        },
        'SystemStatus': { // Start/Status || Status do bot
            'Active': false, // Ativa / Desativa o comando
            'Verificadores': {
                'RAM': '1.00',
                'Swap': '1.00',
                'PorcenCPU': '80'
            },
            'API': 'http://node.seventyhost.net:25015/system-info',
            'Channel': '1011985405291282473',
            'Timer': '6000',
            'Logs': '1011985405291282473',
            'Voce': '<@379089880887721995>'
        },
        'Base': { // Start/Base || Base do Status
            'Active': false, // Ativa / Desativa o comando
        }
    },
    'Slash': {
        'Propriedades': {
            'Tempo': '5000' // Tempo de espera para cada comando slash executado em milisegundos.
        },
        // Comandos do Slash || SlashManager/Pastas.
        'pterodactyl': { // SlashManager/Pterodactyl
            'url': 'https://painel.alternight.ml',
            'token': 'ptla_5ojQO8iPcjLcheXaUgZPedGVZny87aqTQ2yMbyIO1Wc',
            'link': 'https://painel.alternight.ml',
            'registercategory': '1090977688505823303',
            'CreateServerNodeID': '1'
        },
        'Membros': {// SlashManager/Membros
            'Info': {
                'Name': 'Alternight',
                'Dono': 'ΩDrylian_BR/[16198]#5347',
                'ID': '925837612000903251',
                'Website': 'https://www.alternight.ml',
                'Painel': 'https://painel.alternight.ml/',
                'Desc': 'Alternight Servers um projeto um tanto quanto bizarro.'
            }
        },
        'Nextcloud': {
            'URL': 'https://cloud.seventyhost.net',
            'API': 'https://cloud.seventyhost.net/ocs/v2.php/apps/serverinfo/api/v1/info',
            'Username': 'Matheus',
            'Password': '999678769'
        },
    }

}

const crypto = {
    'cryptomoedas': 'BTC,ETH,DOGE,BCH,LTC,ETC,XRP,ADA,XTZ,TRX,ATOM,NEO,BNB,XLM,ALGO,THETA,MKR,ICP,CAKE,AVAX,UNI,FTT,COMP,VET,SOL,AAVE,CHZ,YFI,SRM,CEL,MTL,QTUM,KNC,WAVES,DASH,ONT,ZEC,IOST,1INCH,SNX,SC,ZIL,MANA,GRT,HBAR,MATIC,FIL,REN,RLC,SUSHI,OMG,CRO,ENJ,ANKR,GNT,UMA,RSR,CRV,SRK,BNT,SKL,TVK,ICX,POLS,ELF,SKY,NEAR,ANT,LINK,SNT,CELR,RUNE,CHR,REP,STX,LINA,CHR,LUNA,NMR,XDC,ARK,KAVA,PERP,DODO,BAND,XVS,LSK,AVAX,ADA,MIR,PERP,AXS,RAY,ORN,FTM,MATIC,STORJ,KSM,MAN,BAKE,BTM,IOI,NKN,KAI,SXP,OGN,BOND,FOR,TRB,CTSI,AMP,SAND,BTCST,REEF,TRU,ALICE,BIFI,DF,UTK,CVNT,DGB,BRG,FRONT,DMG,BCHA,RGT,BAT,BNTX,TKO,SXP,NU,AVA,ATA,CHSB,COTI,DAWN,COIN,PLR,BOND,BZRX,SLP,UBT,MARO,KP3R,BEL,BUSD,WIN,KMD,SOLANA,SAFEMOON',
    'polygon': {
        'key': 'j5LTW8SGoPkuljX_93_Y7EPg08h_bwYL',
        'canalaviso': '1090337427983437915',
        'canal': '1090337390893223977',
        'iforcarelativa': '80',
        'ifluxocaixa': '20',
        'timer': '6000'
    }
}

const category = {
    'categories': [
        {
            'name': 'Master',
            'description': 'Comandos de Administração Total',
            'color': '#ff0000',
            'requiredRole': '1002406068191756488',
            'main': true
        },
        {
            'name': 'Administradores',
            'description': 'Comandos de administração do servidor',
            'color': '#ff0000',
            'requiredRole': '1002406551748870174',
            'main': true
        },
        {
            'name': 'Pterodactyl',
            'description': 'Comandos da Pterodactyl-API',
            'color': '#00ff00',
            'main': true
        },
        {
            'name': 'Membros',
            'description': 'Comandos úteis para o servidor',
            'color': '#00ff00',
            'main': true
        },
        {
            'name': 'Ainda Não Sei',
            'description': 'Coisas que o Chat GPT me recomenda',
            'color': 'YELLOW',
            'main': true
        },
        {
            'name': 'Nextcloud',
            'description': 'Comandos de Administração Nextcloud',
            'color': '#ff0000',
            'main': true
        },
    ]
}

module.exports = { // Exporta as configurações
    config,
    crypto,
    category
}