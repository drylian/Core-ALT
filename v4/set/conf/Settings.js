const config = {
    // Modos disponiveis "dev" funciona +/- como um live server, 
    // "debug" depura o node e "normal" iniciação padrão 
    'mode': 'dev',
    // Define o tipo de Rest.put que vai ser usado, 
    // "guild" coloca comandos para serem postados diretamente no grupo rest
    // "normal" coloca comandos para serem postados pela aplicação rest,
    // removendo e atualizando todos os comandos. Demorado para iniciar, porem o melhor
    // "direct" coloca comandos para serem postados diretamente com commands.set(Sem rest) 
    'slashtype': 'direct',
    'clientId': '1037076897919680532', // Id do bot, para o rest
    'guildId': '925837612000903251', // Id do grupo 
    'token': 'MTAzNzA3Njg5NzkxOTY4MDUzMg.GXR7Xs.BJVzo_fFlP8gX9MvtkZYWgJ9J8_HvqhBJ1TkNI',
    'logo': 'https://cdn.discordapp.com/attachments/1033486312956768336/1086420783477297203/logo-alternight.png',
    'events': {
        'entry':{
            'entrada':'1095395213398257745', // Id de canal de entrada
            'saida':'1095395254569549974', // Id de canal de saida
        },
        'slash': {
            'tempo': '5000'// Tempo de recarga para cada comando.
        },
        'status': {
            'tempo': '50000',// Tempo entre cada mudança de Status.
            'type': 'Playing,Listening,Watching,Competing,Streaming', // Não altere, seta status
            'desc': 'Jogando Alternight.,Iniciando Core v2,Criado por Drylian' // Status separados por ","
        },
    },
    'slash':{
        'info':{
            'name':'Alternight',
            'desc':'Um Grupo Muito doido',
            'dono':'Drylian',
            'id':'925837612000903251',
            'website':'https://www.alternight.ml',
            'painel':'https://painel.alternight.ml',
        }
    },
    'express': {
        'active': true, // Determina se esta ativo ou não "true"/"qualquer coisa"
        'admin':'5a4da5d5a4da2ga8f4sa5d2a1f45a2af4ad2asd8as4d52g14a745q',// Pass Admin para o painel visual da url/admin
        'name': 'My Bot', // Nome que será usado em rodas de erros, ou gets, etc
        'port': '3000',// porta do express
        'url': 'http://localhost', // Link do site.
        'front': true // Determina se o Express vai ter FrontEnd. deixe "true"/"qualquer coisa"
    },
    'pterodactyl': {
        'name':'Website', // Nome do Painel
        'token': 'ptla_aYZJ0c0PIAbPGd6JubY5nU4mhlUAt0iTufHovw3hV6O', // token de api do pterodactyl
        'url': 'https://beta.alternight.ml', // Link do pterodactyl.
    },
    'mpago': {
        'access_token':'APP_USR-4372397570265660-110118-61ff93580c79aa5d809c9acaaf73e15c-244358262' // Access Token do mercado pago
    }
}
const category = {
    'categories': [
        {
            'name': 'Membros',
            'description': 'Comandos úteis para o servidor',
            'color': 'blue',
            'main': true
        },
    ]
}

module.exports = { config,category }