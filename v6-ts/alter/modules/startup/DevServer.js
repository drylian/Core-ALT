const colors = require('colors');
const nodemon = require('nodemon');
// Função para iniciar o servidor em modo de desenvolvimento
function DevServer() {
    console.log(`[${colors.cyan(' Init ')}] Servidor em Modo Live iniciado.`);

    // Iniciar o nodemon para monitorar os arquivos
    nodemon({
        script: './set/system/start/start.js',
        watch: ['./web/'], // Pastas que serão monitoradas
        ignore: ['node_modules'], // Arquivos/pastas a serem ignorados
    });

    // Lidar com o reinício do servidor pelo nodemon
    nodemon.on('restart', (files) => {
        console.log(`[${colors.cyan(' LIVE-MODE ')}] Servidor reiniciado. Arquivos modificados:`, files);
    });

    // Lidar com possíveis erros durante a execução do nodemon
    nodemon.on('error', (err) => {
        console.error(`[${colors.cyan(' LIVE-MODE ')}] Erro ao executar o live-mode:`, err);
    });

    // Lidar com o fechamento do processo do nodemon
    nodemon.on('quit', () => {
        console.log(`[${colors.cyan(' LIVE-MODE ')}] Processo encerrado.`);
        process.exit(); // Encerrar o processo principal quando o nodemon for encerrado
    });
}
module.exports = { DevServer };
