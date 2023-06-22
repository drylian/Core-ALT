/**
 * Alternight JDB 2023
 * 
 * Exporta todas as funções para um unico arquivo.
 * 
 */
const { dateformat } = require("./functions/dateformat");
const { dbMaker } = require("./functions/dbMaker");
const { decrypter } = require("./functions/decrypter");
const { encrypter } = require("./functions/encrypter");
const fld = require("./functions/folder");
const { gnu } = require("./functions/gnu");
const json = require("./functions/json");
const { Keymaker } = require("./functions/keyMaker");
const { loadDB } = require("./functions/loadDB");
const { log } = require("./functions/logmanager");
const { saveDB } = require("./functions/saveDB");

module.exports = {
    dateformat, dbMaker, decrypter,
    encrypter, fld, gnu, Keymaker,
    loadDB, log, saveDB, json
}