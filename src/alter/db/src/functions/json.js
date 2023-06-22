/**
 * Alternight JDB 2023
 * 
 * Função auxiliar ler json dinamicamente
 * 
 * uso: console.log(json(local/do/arquivo.json))
 * 
 */
const fs = require('fs');
module.exports = function(local) {
    try {
    const json = fs.readFileSync(local);
    return JSON.parse(json);
    } catch {
        // ignora caso não exista
        return false;
    }
}