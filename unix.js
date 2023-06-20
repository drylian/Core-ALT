const { initTokens } = require('./alter/modules/express/ttokens');
const { StartServer } = require('./alter/modules/startup/startServer');
const { DevServer } = require('./alter/modules/startup/DevServer');
const { WebSetup } = require('./alter/modules/startup/start-type/SetupServer');
const { pmLogger } = require('./alter/modules/startup/PMBus')
// Carrega os token temporários na inicialização
initTokens();
// inicia o logger do pm
pmLogger();
const argv = require('yargs')
    .option('dev', {
        alias: 'd',
        describe: 'Execute modo Desenvolvimento.',
        type: 'boolean',
        default: false
    })
    .option('setup', {
        alias: 's',
        describe: 'Execute o processo de configuração.',
        type: 'boolean',
        default: false
    })
    .option('port', {
        alias: 'p',
        describe: 'Porta para o servidor.',
        type: 'number',
        default: 3000
    })
    .argv;

if (argv.dev) {
    DevServer();
} else if (argv.setup) {
    WebSetup(argv.port);
} else {
    StartServer();
}
