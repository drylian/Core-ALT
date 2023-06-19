const { spawn } = require('child_process');
const init = require('./set/system/start/valide');
const { config, debug } = require('alter');
const { generateTokens } = require('./set/web/Temptokens')
const colors = require('colors');
const nodemon = require('nodemon');

if (config.mode === 'dev') {
  //Carrega os token temporarios na iniciação
  generateTokens()
  console.log(`[${colors.cyan(' LIVE-MODE ')}] Servidor em Modo Live iniciado.`);

  // Iniciar o nodemon para monitorar os arquivos
  const watcher = nodemon({
    script: './set/system/start/start.js',
    watch: ['./web/'], // Pastas que serão monitoradas
    ignore: ['node_modules'], // Arquivos/pastas a serem ignorados
  });

  // Redirecionar a saída do nodemon para o Debug
  watcher.on('stdout', (data) => {
    debug.log(data.toString());
  });

  // Lidar com o reinício do servidor pelo nodemon
  watcher.on('restart', (files) => {
    console.log(`[${colors.cyan(' LIVE-MODE ')}] Servidor reiniciado. Arquivos modificados:`, files);
  });

  // Lidar com possíveis erros durante a execução do nodemon
  watcher.on('error', (err) => {
    console.error(`[${colors.cyan(' LIVE-MODE ')}] Erro ao executar o live-mode:`, err);
  });

  // Lidar com o fechamento do processo do nodemon
  watcher.on('quit', () => {
    console.log(`[${colors.cyan(' LIVE-MODE ')}] Processo encerrado.`);
    process.exit(); // Encerrar o processo principal quando o nodemon for encerrado
  });
} else {
  console.log(`[${colors.gray(' normal ')}] Bot Iniciado em modo padrão`);

  // Função para reiniciar o bot em caso de erro ou encerramento
  const startBot = () => {
    const bot = spawn('node', ['./src/bot.js']);

    // Redirecionar a saída do bot para o DebugContent
    bot.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    // Lidar com possíveis erros durante a execução do bot
    bot.on('error', (err) => {
      console.error(`[${colors.gray(' normal ')}] Erro ao executar o bot:`, err);
      startBot(); // Reiniciar o bot em caso de erro
    });

    // Lidar com o fechamento do processo do bot
    bot.on('close', (code) => {
      console.log(`[${colors.gray(' normal ')}] Processo do bot encerrado com código ${code}`);
      startBot(); // Reiniciar o bot em caso de encerramento
    });
  };

  startBot(); // Iniciar o bot normalmente
}
