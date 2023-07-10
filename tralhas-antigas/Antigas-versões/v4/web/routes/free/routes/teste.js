const express = require('express');
const router = express.Router();
const pm2 = require('pm2');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
// Rota para exibir o formulário de configuração do ecossistema do bot
router.get('/config', (req, res) => {
  const srcDirectory = './src';

  // Scan the "src" directory for bot folders
  fs.readdir(srcDirectory, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao ler diretório');
    }

    // Filter out non-directory files
    const botFolders = files.filter((file) =>
      fs.statSync(path.join(srcDirectory, file)).isDirectory()
    );

    res.render('eco-system/config', { botFolders });
  });
});

// Rota para processar o envio do formulário de configuração e criar o ecossistema do bot
router.post('/config', (req, res) => {
  const botFolder = req.body.folder;
  const botScript = path.join('./src', botFolder, req.body.script);

  const ecosystemConfig = {
    apps: [
      {
        name: req.body.name,
        script: botScript,
        // Adicione outras configurações conforme necessário
      },
    ],
  };

  // Cria o ecossistema usando o PM2
  pm2.connect((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao conectar ao PM2');
    }

    pm2.start(ecosystemConfig, (err, apps) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao iniciar o bot');
      }

      if (req.body.install === 'on') {
        // Install dependencies
        exec(`cd ./src/${botFolder} && npm install`, (err, stdout) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Erro ao instalar pacotes do package.json');
          }

          pm2.disconnect();
          res.redirect('/eco-system/list');
        });
      } else {
        pm2.disconnect();
        res.redirect('/eco-system/list');
      }
    });
  });
});


// Rota para exibir o terminal do bot
router.get('/terminal/:name', (req, res) => {
  const name = req.params.name;

  exec(`pm2 logs ${name} --lines 50`, (err, stdout) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao obter os logs do processo');
    }

    res.render('eco-system/terminal', { logs: stdout });
  });
});

// Rota para exibir o tempo de atividade do bot
router.get('/uptime/:name', async (req, res) => {
  const name = req.params.name;

  try {
    const startTime = await getStartTime(name);
    if (!startTime) {
      return res.status(404).send('Bot não encontrado');
    }

    const currentTime = Date.now();
    const uptimeSeconds = Math.floor((currentTime - startTime) / 1000);
    const uptime = formatUptime(uptimeSeconds);

    res.render('eco-system/uptime', { name, uptime });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao obter o tempo de atividade');
  }
});

// Função auxiliar para obter o tempo de inicialização do bot
function getStartTime(name) {
  return new Promise((resolve, reject) => {
    pm2.describe(name, (err, description) => {
      if (err) {
        reject(err);
      } else {
        const startTime = description[0].pm2_env.created_at;
        resolve(new Date(startTime));
      }
    });
  });
}

// Função auxiliar para formatar o tempo de atividade em um formato legível
function formatUptime(uptimeSeconds) {
  const days = Math.floor(uptimeSeconds / (3600 * 24));
  const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  let uptime = '';
  if (days > 0) {
    uptime += `${days} d, `;
  }
  uptime += `${hours}h ${minutes}m ${seconds}s`;

  return uptime;
}

module.exports = router;
