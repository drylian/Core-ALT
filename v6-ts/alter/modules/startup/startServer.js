const { spawn } = require('child_process');
const colors = require('colors');
const { RestartServer } = require('./restartServer');
const pm2 = require('pm2');

// Função para iniciar o servidor
function StartServer() {
    pm2.start('./bot.js', (err, proc) => {
        if (err) {
            console.error(`[${colors.gray(' normal ')}] Erro ao executar o bot:`, err);
            RestartServer();
        } else {
            console.log(`[${colors.gray(' normal ')}] Processo do bot iniciado.`);
        }
    });
}

module.exports = { StartServer };
