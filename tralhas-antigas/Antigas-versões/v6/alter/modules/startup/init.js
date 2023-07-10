const { initWeb } = require('../../../express/express');
const { db } = require('../db/JDB');
const temp = require('../express/ttokens')
const config = db.get('config')
console.log(config)
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = config.web_port ?? 3000;
const argv = require('yargs')
  .option('setup', {
    alias: 's',
    describe: 'Execute o processo de configuração.',
    type: 'boolean',
    default: false
  })
  .option('port', {
    alias: 'p',
    describe: 'Porta para o servidor.',
    type: 'number',
  })
  .argv;
let IsSetup = argv.setup
// Carrega o painel
initWeb(app, IsSetup);

// Inicia o servidor
let trueport
if(!argv.port) {
  trueport = port
} else {
  trueport = argv.port
}
http.listen(trueport, () => {
  if (IsSetup) {
    console.log(`
        Servidor ativado com Setup, acesse o link especialmente criado abaixo para o servidor.

        Servidor: Em Modo de configurações
        link: http://localhost:${trueport}/setup=${temp.setup}

        Por favor, acesse o link acima para poder configurar seu servidor`
        )
  } else { 
    console.log(`[ Web ] ${config.web_name ?? 'Servidor'} rodando em ${config.web_url ?? 'http://localhost'}:${trueport}`);
  }
});

io.sockets.on('connection', function (sockets) {
  setInterval(function () {
    // Uptime Count
    let uptime = process.uptime();
    let days = Math.floor(uptime / 86400);
    let hours = Math.floor(uptime / 3600) % 24;
    let minutes = Math.floor(uptime / 60) % 60;
    let seconds = Math.floor(uptime % 60);

    var BOTuptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Emitir contagem para o navegador
    sockets.emit('uptime', { uptime: BOTuptime });
  }, 1000);
});
