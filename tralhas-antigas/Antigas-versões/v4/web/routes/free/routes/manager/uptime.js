const express = require('express');
const { db } = require('alter');
const router = express.Router();
const pm2 = require('pm2');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Rota para exibir o formulário de configuração do ecossistema do bot
// Rota para fornecer o tempo de atividade do bot em formato JSON
router.get('/uptime/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const startTime = await getStartTime(name);
        if (!startTime) {
            return res.json({ uptime: 'Offline' });
        }

        const currentTime = Date.now();
        const uptimeSeconds = Math.floor((currentTime - startTime) / 1000);
        const uptime = formatUptime(uptimeSeconds);

        res.json({ uptime: uptime  });
    } catch (err) {
        console.error(`[ Web - Manager > Uptime ] Erro ao obter o Uptime do bot "${name}":` + err);
        res.json({ uptime: 'Erro ao obter o tempo de atividade' });
    }
});

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
        uptime += `${days}d `;
    }
    uptime += `${hours}h ${minutes}m ${seconds}s`;

    return uptime;
}


module.exports = router;