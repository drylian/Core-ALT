/*
 * Alternight JDB 2023
 *
 * Sistema de Database simples criado pelo Drylian.
 * 
 */

async function JDBinit() {
	// verificação/criação do arquivo key.json
	const { ConfigMaker } = require('./src/functions/ConfigMaker');
	await ConfigMaker();
}

JDBinit();
const JDB = require('./src/settings');
// Função principal para manipular o banco de dados
let db = {};
db = require('./src/db');

// Carrega os Models do JDB, recomendado o uso para evitar erros dentro do database
const { JDBM } = require('./models');
const { log } = require('./src/functions/logmanager');
db.drop('alert');
JDBM(db, log);
// console.log(db.imp('config', './src/alter/db/data/db_data/config.json'))
console.log(db.exp('all', './db.json'));
console.log(db.get('alert'));

db.drop('tokens');
const colors = require('colors');
console.log(`[ ${colors.cyan('JDB')} ] Iniciado com sucesso.`);

module.exports = { db, JDB };