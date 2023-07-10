/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve para descryptar o database
 * 
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const { ConfigPath } = require('../../settings');
const json = require('../json');
const CryptoJS = require('crypto-js');
const crypt = json(ConfigPath);

function decrypter(encrypted, textcrypt) {
	// Descriptografar
	if(textcrypt) {
		const decrypted = CryptoJS.AES.decrypt(textcrypt, crypt.key).toString(CryptoJS.enc.Utf8);
		return decrypted;
	}
	const decrypted = CryptoJS.AES.decrypt(encrypted, crypt.key).toString(CryptoJS.enc.Utf8);
	return JSON.parse(decrypted);
}

module.exports = { decrypter };