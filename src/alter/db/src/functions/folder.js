/**
 * Alternight JDB 2023
 * 
 * Função auxiliar para criar pastas
 * 
 * uso "const folder = require('./folder');folder('./local/da/pasta')"
 * 
 */
const fs = require('fs');

module.exports = function(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};
