/**
 * Alternight JDB 2023
 * 
 * Função principal do banco de dados
 * 
 * Função exclusiva do JDB.
 * 
 * uso: db.exp('campo','./local/do/arquivo.json')
 * resposta: exporta o json do "campo" para fora do banco de dados,
 * pode ser usado para exportar dados para clientes
 * 
 */ 
const {
    dateformat, dbMaker, decrypter,
    encrypter, fld, gnu, Keymaker,
    loadDB, log, saveDB, json
} = require('../internal')
const fs = require('fs')

function exp(field, filePath) {
    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      const loadData = JSON.parse(jsonData);
      if (!loadData) {
        log(`Erro: Formato JSON inválido para exportação do campo '${field}'`);
        return false; // Invalid JSON format
      }
    }

    if (!filePath.endsWith('.json')) {
      log(`Erro: Formato de arquivo inválido para exportação do campo '${field}'`);
      return false; // Invalid file format
    }

    const database = loadDB();
    if (database[field]) {
      const data = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
      const tempo = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

      const exportData = {
        export: {
          name: `${field} - Exportada do JDB`,
          description: 'Campo exportado do JDB',
          data: data + ' - ' + tempo
        },
        data: database[field]
      };
      const jsonData = JSON.stringify(exportData, null, 2);
      fs.writeFileSync(filePath, jsonData);
      log(`Campo '${field}' exportado para o arquivo '${filePath}'`);
      return true;
    }
    return false;
  }
module.exports = { exp }