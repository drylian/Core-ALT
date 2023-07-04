/**
 * Alternight 2023 - Todos os direitos reservados.
 * configuração principal para carregar os arquivos do painel
 * Responsavel pelo gerenciamente, executação e todos os tipos de função.
 *
 */
const colors = require('colors');
const nodemon = require('nodemon');
const argv = require('yargs')
    .option('dev', {
        alias: 'd',
        describe: 'Execute modo Desenvolvimento.',
        type: 'boolean',
        default: false
    }).argv;

if (argv.dev) {
    dev();
} else {
    console.log(`[${colors.cyan(' Core ')}] Está iniciando...`);
    require('./src/alter/init');
}

function dev() {
    console.log(`[${colors.cyan(' Core ')}] Iniciado em modo desenvolvimento.`);

    // Iniciar o nodemon para monitorar os arquivos
    nodemon({
        script: './src/alter/init.js',
        watch: ['./src'], // Pastas que serão monitoradas
        ignoreRoot: ['./src/alter/*'],
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