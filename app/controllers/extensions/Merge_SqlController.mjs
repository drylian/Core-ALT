import { QuickDB, MySQLDriver } from 'quick.db';
import { config } from '../ConfigController.mjs'
import { log } from '../LogsController.mjs'
import colors from 'colors';
import folder from '../../modules/folder.mjs'
import { fulltimer } from '../functions/dateformat.mjs'

async function mergeDBs(DePara) {
    /**
     * Inicia o Banco de dados Remoto.
     */
    const mysqlDriver = new MySQLDriver({
        port: config.db.port,
        host: config.db.host,
        user: config.db.username,
        password: config.db.password,
        database: config.db.database,
    });

    await mysqlDriver.connect(); // connect to the database **this is important**

    const RemoteDB = new QuickDB({ mysqlDriver });

    /**
     * Inicia o Banco de dados Interno.
     */
    const APP_DATABASE = config.root + '/Core.sqlite';
    const InternalDB = new QuickDB({ filePath: APP_DATABASE });

    log(`${colors.blue('Sql Merger Controller')} : Iniciando processo de mesclamento dos Bancos de dados...`);
    if (DePara === "mysql->sqlite") {
        log(`${colors.blue('Sql Merger Controller')} : Mesclando Banco de dados remoto ao Banco de dados interno...`);
        log(`${colors.blue('Sql Merger Controller')} : Este processo pode demorar dependendo da quantidade de informações no banco de dados.`);
        log(`${colors.blue('Sql Merger Controller')} : Durante o mesclamento não desligue o sistema, isso pode causar problemas no banco de dados a ser mesclado...`);
        await Merging(RemoteDB, InternalDB)
    } else if (DePara === "mysql<-sqlite") {
        log(`${colors.blue('Sql Merger Controller')} : Mesclando Banco de dados interno ao Banco de dados remoto...`);
        log(`${colors.blue('Sql Merger Controller')} : Este processo pode demorar dependendo da quantidade de informações no banco de dados.`);
        log(`${colors.blue('Sql Merger Controller')} : Durante o mesclamento não desligue o sistema, isso pode causar problemas no banco de dados a ser mesclado...`);
        await Merging(InternalDB, RemoteDB)
    } else if (DePara === "mysql<->sqlite") {
        log(`${colors.blue('Sql Merger Controller')} : Fundindo os Banco de dados interno e Banco de dados remoto...`);
        log(`${colors.blue('Sql Merger Controller')} : Este processo pode demorar dependendo da quantidade de informações no banco de dados.`);
        log(`${colors.blue('Sql Merger Controller')} : Durante a fusão ${colors.bold.red('JAMAIS DESLIGUE O PROCESSAMENTO DO SERVIDOR.')}`);
        await FundindDBS(RemoteDB, InternalDB)
    } else {
        log(`${colors.blue('Sql Merger Controller')} : Está operação é importante de mais,vapenas valores como `);
        log(`${colors.blue('Sql Merger Controller')} : "mysql->sqlite", "mysql<-sqlite". Serão permitidos.`);
    }
}

async function Merging(databaseRight, databaseLeft) {
    /**
     * função para obter as informações do databaseRight e seta-las pro databaseLeft.
     */
    let FullData = databaseRight.all();
    for (let item of FullData) {
        /**
         * Verifica se as informações ja existe ou não.
         */
        if (databaseLeft.has(item.ID)) {
            // Incrementar o valor da chave existente
            databaseLeft.add(item.ID, item.data);
        } else {
            // Inserir a chave e o valor no banco de dados remoto
            databaseLeft.set(item.ID, item.data);
        }
    }
}

async function FundindDBS(databaseRight, databaseLeft) {
    /**
     * Backup Externo
     */
    log(`${colors.blue('Sql Merger Controller')} [1/10] : Iniciando criação de backup do banco de dados (Externo)...`);
    const BackUpExternal = await CreateBackUp('externalDatabase')
    log(`${colors.blue('Sql Merger Controller')} [2/10] : gerando backup (Externo)...`);
    await Merging(databaseRight, BackUpExternal)
    log(`${colors.blue('Sql Merger Controller')} [3/10] : Backup externo foi completado (Externo)...`);

    /**
     * Backup interno
     */
    log(`${colors.blue('Sql Merger Controller')} [4/10] : Iniciando criação de backup do banco de dados (Interno)...`);
    const BackUpInternal = await CreateBackUp('ixternalDatabase')
    log(`${colors.blue('Sql Merger Controller')} [5/10] : gerando backup (Interno)...`);
    await Merging(databaseLeft, BackUpInternal)
    log(`${colors.blue('Sql Merger Controller')} [6/10] : Backup interno foi completado (Interno)...`);
    
    /**
     * Inicia processo de Fundição
     */
    log(`${colors.blue('Sql Merger Controller')} [7/10] : Iniciando processo de fundição dos bancos de dados.`);
    await FundindAllData(databaseRight, databaseLeft)
}

async function CreateBackUp(Typend) {
    /**
     * Cria a Pasta de Backups dos bancos de dados.
     */
    folder(config.root + '/BackUp')
    const timeBackup = fulltimer()
    const BACKUP_DATABASE = config.root + '/BackUp' + '/' + timeBackup + '/' + Typend + '.sqlite';
    return new QuickDB({ filePath: BACKUP_DATABASE });
}

async function FundindAllData(databaseRight, databaseLeft) {
    const dataRight = databaseRight.all();
    const dataLeft = databaseLeft.all();
    const mergedData = Object.assign({}, dataRight, dataLeft);

    log(`${colors.blue('Sql Merger Controller')} [8/10] : Iniciando mesclamento...`);

    for (let [ID, data] of Object.entries(mergedData)) {
        if (databaseRight.has(ID)) {
          databaseRight.add(ID, data);
        } else {
          databaseRight.set(ID, data);
        }
    
        if (databaseLeft.has(ID)) {
          databaseLeft.add(ID, data);
        } else {
          databaseLeft.set(ID, data);
        }
    
        log(`${colors.blue('Sql Merger Controller')} [9/10] : Dados mesclados para o item com ID ${ID}.`);
      }
    log(`${colors.blue('Sql Merger Controller')} [10/10] : Fundição dos dois banco de dados foi completada.`);
}

export { mergeDBs }