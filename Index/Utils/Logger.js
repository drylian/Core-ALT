const fs = require('fs');
const colors = require('colors');

const logDir = './logs';

if (!fs.existsSync(logDir)) {
    console.log(`[${colors.magenta(' LOG ')}] Pasta Logs não existe, Criando uma.`);
    fs.mkdirSync(logDir);
}

const commandLogStream = fs.createWriteStream(`${logDir}/Comandos.txt`, { flags: 'a' });
const errorLogStream = fs.createWriteStream(`${logDir}/Erros.txt`, { flags: 'a' });
const floodLogStream = fs.createWriteStream(`${logDir}/Flood.txt`, { flags: 'a' });
const warningLogStream = fs.createWriteStream(`${logDir}/Avisos.txt`, { flags: 'a' });

function logCommand(commandName, userId, userUsername, userDiscriminator) {
    const logMessage = `[${new Date().toLocaleString()}] Comando Slash "/${commandName}" usado pelo usuário ${userUsername}#${userDiscriminator}(${userId})\n`;
    console.log(`[ ${colors.green('/' + commandName)} ] Foi executado pelo usuário ${colors.blue(userUsername + '#' + userDiscriminator)}(${userId})\n`);
    commandLogStream.write(logMessage);
}

function logError(commandName, error) {
    const logMessage = `[${new Date().toLocaleString()}] Erro no Comando Slash "/${commandName}" , Erro: ${error.stack}\n`;
    console.log(`[ ${colors.red('/' + commandName)} ] Obteve o Erro ao ser executado: ${error.stack}\n`);
    errorLogStream.write(logMessage);
}

function logFlood(commandName, userId, userUsername, userDiscriminator) {
    const logMessage = `[${new Date().toLocaleString()}] Comando Slash "/${commandName}" floodado pelo usuário ${userUsername}#${userDiscriminator}(${userId})\n`;
    console.log(`[ ${colors.yellow('/' + commandName)} ] Foi floodado pelo usuário ${colors.blue(userUsername + '#' + userDiscriminator)}(${userId})\n`);
    floodLogStream.write(logMessage);
}

function logWarning(commandName, logContent) {
  const logMessage = `[${new Date().toLocaleString()}] Comando Slash "/${commandName}" gerou um aviso: ${logContent}\n`;
  console.log(`[ ${colors.yellow('/' + commandName)} ] Gerou o aviso: ${logContent}\n`);
  warningLogStream.write(logMessage);
}

module.exports = { logCommand, logError, logFlood, logWarning };

