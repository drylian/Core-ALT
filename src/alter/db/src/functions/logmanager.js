const fs = require('fs');
/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, o sistema de logs do database
 * 
 * uso: log('mensagem')
 * resposta que vai receber: console.log('[ ${colors.cyan('JDB')} ] mensagem')
 * 
 */
const { dateformat } = require('./dateformat');
const path = require('path');
const colors = require('colors')
const { logPath, crypt } = require('../settings')

function log(message, isError) {
    if (crypt.logs_display === "on") {
        if (!isError) {
            console.log(`[ ${colors.cyan('JDB')} ] ` + colors.green(message));
        } else {
            console.log(`[ ${colors.cyan('JDB') + ' - ' + colors.red('ERRO')} ] ` + colors.red(message));
        }
    }
    if (crypt.logs === "on") {
        const currentDate = dateformat();
        const logFilePath = path.join(logPath, `${currentDate}.db_content.logs`);

        fs.mkdirSync(logPath, { recursive: true });
        fs.appendFileSync(logFilePath, `[ JDB-Logs ] ${message}\n`);
    }
}

module.exports = { log }