/*
 * Alternight JDB 2023
 *
 * Sistema de Database simples criado pelo Drylian.
 * 
 */
const { dbMaker, Keymaker, log } = require('./src/internal')

// verificação/criação do arquivo key.json
Keymaker()

// verificação/criação do arquivo db.json
dbMaker()

// Função principal para manipular o banco de dados
const db = require('./src/db')

// Carrega os Models do JDB, recomendado o uso para evitar erros dentro do database
const { JDBM } = require('./models');
JDBM(db, logMessage)

log('Carregamento do Database foi completado.')

module.exports = { db };