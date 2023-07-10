/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve para encryptar o database
 *  
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const { ConfigPath } = require('../../settings');
const json = require('../json');
const CryptoJS = require('crypto-js');
const crypt = json(ConfigPath);
function encrypter(value, textcrypt) {
    if (crypt) {
        if (textcrypt) {
            const encrypted = CryptoJS.AES.encrypt(textcrypt, crypt.key).toString();
            return encrypted
        }
        // Criptografar
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), crypt.key).toString();
        return encrypted
    }
}

module.exports = { encrypter };