/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve para encoda textos em Base64
 *  
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const CryptoJS = require('crypto-js');

function Base64encoder(value) {
	// Criptografar
	const encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
	return encoded;
}

module.exports = { Base64encoder };