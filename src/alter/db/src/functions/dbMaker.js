/**
 * Alternight JDB 2023
 * 
 * função principal, serve para salvar o banco de dados.
 * 
 * uso: dbMaker(./local/do/db)
 * 
 */
const { saveDB } = require('./saveDB')
const colors = require('colors')
const fs = require('fs')
// Configuração do Banco de dados
function dbMaker(dbPath) {
  if (fs.existsSync(dbPath)) {
    console.log(`[ ${colors.cyan('JDB')} ] Banco de dados iniciado.`);
  } else {
    console.log(`[ ${colors.cyan('JDB')} ] Banco de dados não detectado, criando um novo.`);

    // Cria um novo banco de dados vazio
    saveDB({});

    console.log(`[ ${colors.cyan('JDB')} ] Banco de dados criado com sucesso.`);
  }
}

module.exports = { dbMaker }