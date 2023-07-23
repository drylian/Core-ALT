import colors from 'colors';
import nodemon from 'nodemon';
function dev() {
    console.log(`[${colors.cyan(' Core ')}] Iniciado em modo desenvolvimento.`);

    // Iniciar o nodemon para monitorar os arquivos
    nodemon({
        script: './app/modules/inicializer/init.mjs',
        watch: './app',
        ignoreRoot: ['./app/config'],
        ignore: ['node_modules'], // Arquivos/pastas a serem ignorados
    });

    // Lidar com o reinício do servidor pelo nodemon
    nodemon.on('restart', (files) => {
        console.log(`[${colors.cyan(' Core ')}] Servidor reiniciado. Arquivos modificados:`, files);
    });

    // Lidar com possíveis erros durante a execução do nodemon
    nodemon.on('error', (err) => {
        console.error(`[${colors.cyan(' Core ')}] Erro ao executar o live-mode:`, err);
    });

    // Lidar com o fechamento do processo do nodemon
    nodemon.on('quit', () => {
        console.log(`[${colors.cyan(' Core ')}] Processo encerrado.`);
        process.exit(); // Encerrar o processo principal quando o nodemon for encerrado
    });
}
export { dev }