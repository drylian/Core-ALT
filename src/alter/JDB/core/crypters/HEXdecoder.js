/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve para encryptar o database
 *  
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const CryptoJS = require('crypto-js');

function HEXdecoder(hexString) {
  const wordArray = CryptoJS.enc.Hex.parse(hexString);
  const text = CryptoJS.enc.Utf8.stringify(wordArray);
  return text;
}

module.exports = { HEXdecoder };

