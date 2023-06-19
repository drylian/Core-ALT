const pm2 = require('pm2');
const colors = require('colors');

function pmLogger() {
    pm2.launchBus((err, bus) => {
        if (err) {
            console.error(`[${colors.gray(' LOGS ')}] Erro ao redirecionar logs do PM2:`, err);
            return;
        }
        console.log(`[${colors.gray(' LOGS ')}] Redirecionando logs do PM2 para o console principal...`);
        
        bus.on('log:out', (packet) => {
            console.log(`[${colors.gray(' PM2 ')}] ${packet.process.name}: ${packet.data}`);
        });
        
        bus.on('log:err', (packet) => {
            console.error(`[${colors.gray(' PM2 ')}] ${packet.process.name}: ${packet.data}`);
        });
    });
}
module.exports = { pmLogger }