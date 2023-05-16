const { spawn } = require('child_process');
const { config } = require('./Settings');
const { DebugContent } = require('./Index/Utils/Logger');

if (config.Debug === true) {
  // Executar o Node.js com a opção --inspect
  const node = spawn('node', ['--inspect', './Index/bot.js']);

  // Redirecionar a saída do node para o DebugContent
  node.stdout.on('data', (data) => {
    DebugContent(data.toString());
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
  require('./Index/bot.js');
}
