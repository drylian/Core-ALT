const { spawn } = require('child_process');
const { config, debug } = require('alter');
const nodemon = require('nodemon');
if (config.mode === 'dev') {  
  console.log('[ LIVE-MODE ] Servidor em Modo Live iniciado.');
  // Iniciar o nodemon para monitorar os arquivos na pasta bot
  const watcher = nodemon({
    script: './src/bot.js',
    watch: './src/', // Pasta que será monitorada
    ignore: ['node_modules'], // Arquivos/pastas a serem ignorados
  });

  // Redirecionar a saída do nodemon para o Debug
  watcher.on('stdout', (data) => {
    debug.log(data.toString());
  });

  // Lidar com o reinício do servidor pelo nodemon
  watcher.on('restart', (files) => {
    console.log('[ LIVE-MODE ] Servidor reiniciado. Arquivos modificados:', files);
  });
  // Lidar com possíveis erros durante a execução do nodemon
  watcher.on('error', (err) => {
    console.error('[ LIVE-MODE ] Erro ao executar o live-mode:', err);
  });

  // Lidar com o fechamento do processo do nodemon
  watcher.on('quit', () => {
    console.log('[ LIVE-MODE ] Processo encerrado.');
    process.exit(); // Encerrar o processo principal quando o nodemon for encerrado
  });
} else if (config.mode === 'debug') {
  // Executar o Node.js com a opção --inspect
  const node = spawn('node', ['--inspect', './src/bot.js']);

  // Redirecionar a saída do node para o DebugContent
  node.stdout.on('data', (data) => {
    debug.log(data.toString());
  });

  // Lidar com possíveis erros durante a execução do node
  node.on('error', (err) => {
    console.error('Erro ao executar o Node.js:', err);
  });

  // Lidar com o fechamento do processo do node
  node.on('close', (code) => {
    console.log(`Processo do Node.js encerrado com código ${code}`);
  });
} else {
  // Executar o bot normalmente
  require('./src/bot.js');
}