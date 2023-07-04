/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve para encryptar o database
 *  
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const CryptoJS = require('crypto-js');

function HEXencoder(hexString) {
	const hexData = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(hexString));
	return hexData;
}

module.exports = { HEXencoder };
