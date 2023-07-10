/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve para encryptar o database
 *  
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const { keyPath } = require('../../../settings');
const json = require('../../json');
const crypto = require('crypto');
const crypt = json(keyPath);
function encrypter(value) {
	if (crypt) {
		const algorithm = 'aes-192-cbc';
		const password = crypt.pass;

		const key = crypto.scryptSync(password, 'salt', 24);

		const iv = crypto.randomBytes(16);

		const cipher = crypto.createCipheriv(algorithm, key, iv);
		let encrypted = cipher.update(value, 'utf8', 'hex');
		encrypted += cipher.final('hex');

		return {
			key: iv.toString('hex'),
			db: encrypted
		};
	}
}

module.exports = { encrypter };