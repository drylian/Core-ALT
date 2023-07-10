/**
 * Alternight JDB 2023
 * 
 * Sistema Controlador do banco de dados principal, Responsavel
 * pelo gerenciamento controlado do banco de dados,
 * impedindo problemas e garantindo uma vida estabilizada pro 
 * banco de dados.
 */

const { loadSQL } = require('../sql/loadSQL');
const { saveSQL } = require('../sql/saveSQL');
const { log } = require('./logs_controller')

let saveReqCounter = 0;
let loadReqCounter = 0;
const saveReqFiler = [];
const loadReqFiler = [];

async function saveDB(tableName, data) {
    const config = require('../../config.json');
    const Save_minCount = config.Save_minCount
    const Save_maxCount = config.Save_maxCount
    return new Promise((resolve, reject) => {
        saveReqCounter++;
        saveReqFiler.push({
            tableName,
            data,
            resolve,
            reject,
        });
        processSaveReq(Save_minCount, Save_maxCount);
    });
}

async function loadDB(tableName) {
    const config = require('../../config.json');
    const Load_minCount = config.Load_minCount
    const Load_maxCount = config.Load_maxCount
    return new Promise((resolve, reject) => {
        loadReqCounter++;
        loadReqFiler.push({
            tableName,
            resolve,
            reject,
        });
        processLoadReq(Load_minCount, Load_maxCount);
    });
}

async function processSaveReq(minCount, maxCount) {
    while (saveReqCounter > 0 && saveReqFiler.length > 0) {
        const { tableName, data, resolve, reject } = saveReqFiler.shift();

        try {
            await saveSQL(tableName, data);
            saveReqCounter--;
            resolve(true);
        } catch (error) {
            log(`Erro ao tentar salvar o Banco de dados(SQl-Controller):${error}`, "0", true);
            reject({ error: "Falha ao tentar obter os dados" });
        }

        if (saveReqCounter > maxCount) {
            log(`Aviso: Mais de ${saveReqCounter} solicitações de saveDB para o Banco de dados, o que pode causar demora nas respostas...`, "1")
        } else if (saveReqCounter === minCount) {
            log('Aviso: As solicitações de saveDB foram normalizadas', "1");
        }
    }
}

async function processLoadReq(minCount, maxCount) {
    while (loadReqCounter > 0 && loadReqFiler.length > 0) {
        const { tableName, resolve, reject } = loadReqFiler.shift();

        try {
            const content = await loadSQL(tableName);
            loadReqCounter--;

            resolve(content);
        } catch (error) {
            log(`Erro ao tentar carregar o Banco de dados(SQl-Controller):${error}`, "0", true);
            reject({});
        }

        if (loadReqCounter > maxCount) {
            log(`Aviso: Mais de ${loadReqCounter} solicitações de loadDB para o Banco de dados, o que pode causar demora nas respostas...(SQl-Controller)`, "0");
        } else if (loadReqCounter === minCount) {
            log(`Aviso: As solicitações de loadDB foram normalizadas(SQl-Controller)`, "0");
        }
    }
}

module.exports = { saveDB, loadDB };
