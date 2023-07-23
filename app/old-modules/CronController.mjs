import cron from 'node-cron';
import { db } from './SqlController.mjs';
import { log } from './LogsController.mjs';

// Função para criar e iniciar crons com base no JSON
async function CronController() {
    const cronList = await db.get('cron');
    console.log(cronList);

    if (!cronList || cronList.length === 0) {
        return;
    }

    cronList.forEach(async (item) => {
        cron.schedule(item.cron, async () => {
            await Executer(item);
        });
    });
}

async function Executer(item) {
    const execute = new Function(`return (${item.exec})`)();
    eval(await execute())
    log(`Tarefa de cron "${item.name}" executada!`);
}

// Chamar a função CronController() para criar e iniciar os cronjobs
CronController();
