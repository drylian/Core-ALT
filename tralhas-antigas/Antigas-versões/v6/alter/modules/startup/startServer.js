const { spawn } = require('child_process');
const colors = require('colors');
const { RestartServer } = require('./restartServer');
const pm2 = require('pm2');

// Função para iniciar o servidor
function StartServer(IsSetup, ThisPort) {
    const Inicializer = IsSetup ? ['--setup', '--port', ThisPort] : [];
    pm2.start({
        script: './alter/modules/startup/init.js',
        args: Inicializer
    }, (err, proc) => {
        if (err) {
            console.error(`[${colors.gray(' Starting ')}] Erro ao executar o servidor:`, err);
            // RestartServer();
        } else if (IsSetup) {
            console.log(`[${colors.gray(' Starting ')}] Iniciado em modo Setup.`);
        } else {
            console.log(`[${colors.gray(' Starting ')}] Iniciado em modo padrão.`);
        }
    });
}

module.exports = { StartServer };
