const initWeb = require('../../../web/web');
const db = require('../json');
const config = db.config;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = config.web_port;

// Carrega o painel
initWeb(app);

// Inicia o servidor
http.listen(port, () => {
  console.log(`[ Web ] ${config.web_name ?? 'Servidor'} rodando em ${config.web_url ?? 'http://localhost'}:${port}`);
});

io.sockets.on('connection', function(sockets) {
  setInterval(function() {
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
