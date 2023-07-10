const fs = require('fs');
const { config } = require('../../Settings');
const colors = require('colors');

const logDir = './logs';
const logdebug = './logs/Debug';
const logEvent = './logs/Events';
const logSlash = './logs/SlashManager';


if (!fs.existsSync(logDir)) {
    console.log(`[${colors.magenta(' LOGGER ')}] Pasta Logs não existe, Criando uma.`);
    fs.mkdirSync(logDir);
}
if (!fs.existsSync(logEvent)) {
    console.log(`[${colors.magenta(' LOGGER ')}] Pasta Logs de Eventos não existe, Criando uma...`);
    fs.mkdirSync(logEvent);
}
if (!fs.existsSync(logSlash)) {
    console.log(`[${colors.magenta(' LOGGER ')}] Pasta Logs de Slash não existe, Criando uma...`);
    fs.mkdirSync(logSlash);
}
if (!fs.existsSync(logdebug)) {
    console.log(`[${colors.magenta(' LOGGER ')}] Pasta Logs de Debug não existe, Criando uma...`);
    fs.mkdirSync(logdebug);
}
if (config.Debug === true) {
    // Bloco de código a ser executado se config.debug.active for true
    const today = new Date();
    const date = today.toLocaleDateString('pt-BR').replaceAll('/', '_'); // Substitui barras por underscores para evitar problemas com o nome do arquivo;
    const Debug = fs.createWriteStream(`${logdebug}/${date}_debug_content.txt`, { flags: 'a' });

    function DebugContent(DebuggedContent) {
        const logMessage = DebuggedContent;
        console.log(`[ ${colors.green('DEBUG')} ] ${DebuggedContent}`);
        Debug.write(logMessage);
    }
}


function SlashManagerLogger() {// função de Logs para o Slash

    const logSlash = './logs/SlashManager';

    const commandLogStream = fs.createWriteStream(`${logSlash}/Comandos.txt`, { flags: 'a' });
    const errorLogStream = fs.createWriteStream(`${logSlash}/Erros.txt`, { flags: 'a' });
    const floodLogStream = fs.createWriteStream(`${logSlash}/Flood.txt`, { flags: 'a' });
    const warningLogStream = fs.createWriteStream(`${logSlash}/Avisos.txt`, { flags: 'a' });

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

    return { logCommand, logError, logFlood, logWarning };
}

function EventManagerLogger() { // Função para Logs de Eventos
    const logEvent = './logs/Events';

    const commandLogStream = fs.createWriteStream(`${logEvent}/Comandos.txt`, { flags: 'a' });
    const errorLogStream = fs.createWriteStream(`${logEvent}/Erros.txt`, { flags: 'a' });
    const warningLogStream = fs.createWriteStream(`${logEvent}/Avisos.txt`, { flags: 'a' });

    function logCommand(EventName) {
        const logMessage = `[${new Date().toLocaleString()}] Evento "${EventName}" foi iniciado com Sucesso\n`;
        console.log(`[ ${colors.green(EventName)} ] Iniciou com Sucesso.`);
        commandLogStream.write(logMessage);
    }

    function logError(EventName, error) {
        const logMessage = `[${new Date().toLocaleString()}] Erro no Evento "${EventName}" , Erro: ${error.stack}\n`;
        console.log(`[ ${colors.red('LOGGER - ' + EventName)} ] Obteve o Erro ao ser executado: ${error.stack}\n`);
        errorLogStream.write(logMessage);
    }


    function logWarning(EventName, logContent) {
        const logMessage = `[${new Date().toLocaleString()}] Evento "${EventName}" gerou um aviso: ${logContent}\n`;
        console.log(`[ ${colors.yellow('LOGGER - ' + EventName)} ] Gerou o aviso: ${logContent}`);
        warningLogStream.write(logMessage);
    }

    return { logCommand, logError, logWarning };
}

module.exports = { SlashManagerLogger, EventManagerLogger, DebugContent };

