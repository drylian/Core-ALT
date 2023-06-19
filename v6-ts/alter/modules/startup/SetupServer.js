const { spawn } = require('child_process');
const colors = require('colors');
const nodemon = require('nodemon');
const { StartServer } = require('./startServer')
const { pmLogger } = require('./PMBus')
const pm2 = require('pm2');
function WebSetup(port) {
    pm2.start({
        script: './alter/modules/web/setup/express.js',
        args: ['--port', port] // Substitua 'port' pelo valor da porta desejada
      },(err, proc) => {
        if (err) {
            console.error(`[${colors.gray(' SETUP ')}] Erro ao executar o bot:`, err);
        } else {
            console.log(`[${colors.gray(' SETUP ')}] Processo do bot iniciado.`);
        }
    });
}

function StopWebSetup() {
    pm2.killDaemon('express', (err) => {
        if (err) {
            console.error(`[${colors.gray(' SETUP ')}] Erro ao parar o processo:`, err);
        } else {
            console.log(`[${colors.gray(' SETUP ')}] Finalizando Setup. iniciando servidor normalmente.`);
            pmLogger()
            StartServer()
        }
    });
}

module.exports = { WebSetup, StopWebSetup };
