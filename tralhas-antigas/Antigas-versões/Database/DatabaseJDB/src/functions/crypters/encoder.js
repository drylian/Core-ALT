/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve para encoda o fields
 *  
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const CryptoJS = require('crypto-js');

function encoder(value) {
    // Criptografar
    const encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
    return encoded
}

module.exports = { encoder };