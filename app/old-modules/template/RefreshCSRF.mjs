import { log } from '../controllers/LogsController.mjs';
import { db } from '../controllers/SqlController.mjs';
import colors from 'colors';
const cronList = await db.get('cron') || [];

/**
 * Configuração do Cron
 */

// Função Runner
const Runner = async () => {
/**************************************************************/
    const fs = await import('fs');
    const path = './app/storage/Csrf-tokens';

    fs.readdir(path, (err, files) => {
        if (err) {
            console.error('Erro ao ler diretório:', err);
            return;
        }

        const currentTime = new Date();
        files.forEach((file) => {
            const filePath = path + '/' + file;
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Erro ao obter informações do arquivo:', err);
                    return;
                }

                const fileCreationTime = stats.birthtime;
                const timeDifference = currentTime - fileCreationTime;
                const tenHoursInMilliseconds = 10 * 60 * 60 * 1000; // 10 horas em milissegundos

                if (timeDifference > tenHoursInMilliseconds) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Erro ao excluir arquivo:', err);
                            return;
                        }
                        console.log('Arquivo excluído:', filePath);
                    });
                }
            });
        });
    });
/**************************************************************/
}

const newCron = {
    cron: "* * * * *",
    system: true,
    name: "Refresh CSRF",
    type: "eval",
    exec: Runner.toString(), // Converte a função em uma string
};

/**
 * Configurações do Cron
 */
const existingCron = cronList.find((cron) => cron.name === newCron.name && cron.type === newCron.type);
if (!existingCron) {
    cronList.push(newCron);
    await db.set('cron', cronList);
    log('Registrando Model "RefreshCSRF"');
} else {
    log(`RefreshCSRF = ${colors.green('OK')}`);
}
