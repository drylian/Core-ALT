const colors = require('colors');
const pm2 = require('pm2');
// Função para parar o servidor
function StopServer() {
    console.log('Desligando Servidor...');
    pm2.stop('discord', (err) => {
        if (err) {
            console.error(`[${colors.gray(' normal ')}] Erro ao parar o bot:`, err);
        } else {
            console.log(`[${colors.gray(' normal ')}] Bot parado.`);
            process.exit(0); // Desligar o servidor
        }
    });
}
module.exports = {  StopServer };
