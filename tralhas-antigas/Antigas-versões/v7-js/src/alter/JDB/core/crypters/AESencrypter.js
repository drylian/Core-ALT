/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve para encryptar o database
 *  
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const config = require('../../config.json');
const CryptoJS = require('crypto-js');
function AESencrypter(value, textcrypt) {
	if (config) {
		if (textcrypt) {
			const encrypted = CryptoJS.AES.encrypt(textcrypt, config.key).toString();
			return encrypted;
		}
		// Criptografar
		const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), config.key).toString();
		return encrypted;
	}
}

module.exports = { AESencrypter };