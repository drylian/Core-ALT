/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve para descryptar o database
 * 
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */

const config = require('../../config.json');
const CryptoJS = require('crypto-js');

function AESdecrypter(encrypted, textcrypt) {
	if (config) {
		// Descriptografar
		if (textcrypt) {
			const decrypted = CryptoJS.AES.decrypt(textcrypt, config.key).toString(CryptoJS.enc.Utf8);
			return decrypted;
		}
		const decrypted = CryptoJS.AES.decrypt(encrypted, config.key).toString(CryptoJS.enc.Utf8);
		return JSON.parse(decrypted);
	}
}

module.exports = { AESdecrypter };