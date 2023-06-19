const colors = require('colors');
const pm2 = require('pm2');
// Função para reiniciar o servidor
function RestartServer() {
    console.log('Reiniciando bot...');
    pm2.restart('bot', (err) => {
        if (err) {
            console.error(`[${colors.gray(' normal ')}] Erro ao reiniciar o bot:`, err);
        } else {
            console.log(`[${colors.gray(' normal ')}] Bot reiniciado.`);
        }
    });
}

module.exports = { RestartServer };
