/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve para decodar textos em Base64
 *  
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const CryptoJS = require('crypto-js');
function Base64decoder(encoded) {
	// decoda 
	const decoded = CryptoJS.enc.Base64.parse(encoded).toString(CryptoJS.enc.Utf8);
	return decoded;
}

module.exports = { Base64decoder };