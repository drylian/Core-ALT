import { config } from 'dotenv';
import { log } from './LogsController.mjs'
// Carrega as variáveis de ambiente do arquivo .env
config();

async function init() {
    // Configura as pastas do sistema antes da iniciação.
    await import('./ConfigController.mjs')
    log('Configurações iniciais finalizadas, iniciando banco de dados...')

    // Configura banco de dados inicial do painel
    await import('./SqlController.mjs')
    log('Banco de dados iniciado')

    // Inicia o express do painel
    await import('./ExpressController.mjs')
    log('Express Iniciado com Sucesso.')
}

await init()

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