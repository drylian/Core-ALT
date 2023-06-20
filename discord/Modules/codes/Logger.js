const fs = require('fs');
const colors = require('colors');

const logDir = './logs';
const logDebug = './logs/Debug';
const logEvent = './logs/Events';
const logExpress = './logs/Espress';
const logSlash = './logs/Slash';


function createLogDirIfNotExist(logPath, logType) {
    if (!fs.existsSync(logPath)) {
        console.log(`[${colors.magenta(' LOGGER ')}] Pasta Logs de ${logType} não existe, Criando uma...`);
        fs.mkdirSync(logPath);
    }
}

createLogDirIfNotExist(logDir, 'Logs');
createLogDirIfNotExist(logEvent, 'Eventos');
createLogDirIfNotExist(logSlash, 'Slash');
createLogDirIfNotExist(logDebug, 'Debug');
createLogDirIfNotExist(logExpress, 'Express');

function DebugLogger(logPath) {
    const today = new Date();
    const date = today.toLocaleDateString('pt-BR').replaceAll('/', '_');
    const LogStream = createLogStream(`${logPath}/${date}_debug.txt`);

    function log(content) {
        const logMessage = `[${new Date().toLocaleString()}] ${content}\n`;
        console.log(`[ DEBUG ]` + content + '.');
        LogStream.write(logMessage);
    }

    return { log };
}

function createLogStream(logPath) {
    return fs.createWriteStream(logPath, { flags: 'a' });
}

function EventLogger(logPath) {
    const LogStream = createLogStream(`${logPath}/Comandos.txt`);
    const errorLogStream = createLogStream(`${logPath}/Erros.txt`);

    function log(content) {
        const logMessage = `[${new Date().toLocaleString()}] ${content}\n`;
        console.log(content);
        LogStream.write(logMessage);
    }

    function err(EventName, error) {
        const logMessage = `[${new Date().toLocaleString()}] Erro no Evento "${EventName}" , Erro: ${error.stack}\n`;
        console.log(`[ ${colors.red('LOGGER - ' + EventName)} ] Obteve o Erro ao ser executado: ${error.stack}\n`);
        errorLogStream.write(logMessage);
    }

    return { log, err };
}

function ExpressLogger(logPath) {
    const LogStream = createLogStream(`${logPath}/Eogs.txt`);
    const errorLogStream = createLogStream(`${logPath}/Erros.txt`);

    function log(content) {
        const logMessage = `[${new Date().toLocaleString()}] ${content}\n`;
        console.log(`[ ${colors.blue('Express')} ] ${content}`);
        LogStream.write(logMessage);
    }

    function err(error) {
        const logMessage = `[${new Date().toLocaleString()}] Erro no Evento "${EventName}" , Erro: ${error.stack}\n`;
        console.log(`[ ${colors.red('LOGGER - Express')} ] ${error.stack}\n`);
        errorLogStream.write(logMessage);
    }

    return { log, err };
}

function SlashLogger(logPath) {
    const commandLogStream = createLogStream(`${logPath}/Comandos.txt`);
    const errorLogStream = createLogStream(`${logPath}/Erros.txt`);
    const floodLogStream = createLogStream(`${logPath}/Flood.txt`);
    const warningLogStream = createLogStream(`${logPath}/Avisos.txt`);

    function cmd(commandName, userId, userUsername, userDiscriminator) {
        const logMessage = `[${new Date().toLocaleString()}] Comando Slash "/${commandName}" usado pelo usuário ${userUsername}#${userDiscriminator}(${userId})\n`;
        console.log(`[ ${colors.green('/' + commandName)} ] Foi executado pelo usuário ${colors.blue(userUsername + '#' + userDiscriminator)}(${userId})\n`);
        commandLogStream.write(logMessage);
    }

    function err(commandName, error) {
        const logMessage = `[${new Date().toLocaleString()}] Erro no Comando Slash "/${commandName}" , Erro: ${error.stack}\n`;
        console.log(`[ ${colors.red('/' + commandName)} ] Obteve o Erro ao ser executado: ${error.stack}\n`);
        errorLogStream.write(logMessage);
    }

    function flood(commandName, userId, userUsername, userDiscriminator) {
        const logMessage = `[${new Date().toLocaleString()}] Comando Slash "/${commandName}" floodado pelo usuário ${userUsername}#${userDiscriminator}(${userId})\n`;
        console.log(`[ ${colors.yellow('/' + commandName)} ] Foi floodado pelo usuário ${colors.blue(userUsername + '#' + userDiscriminator)}(${userId})\n`);
        floodLogStream.write(logMessage);
    }

    function warn(commandName, logContent) {
        const logMessage = `[${new Date().toLocaleString()}] Comando Slash "/${commandName}" gerou um aviso: ${logContent}\n`;
        console.log(`[ ${colors.yellow('/' + commandName)} ] Gerou o aviso: ${logContent}\n`);
        warningLogStream.write(logMessage);
    }

    return { cmd, err, flood, warn };
}

const slash = SlashLogger(logSlash);
const event = EventLogger(logEvent);
const debug = DebugLogger(logDebug);
const expresss = ExpressLogger(logExpress);

module.exports = { slash, event, debug, expresss };
