/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, serve para descryptar o database
 * 
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const { crypt } = require('../settings')
const crypto = require('crypto')

function decrypter(valor) {
    const algorithm = 'aes-192-cbc';
    const password = crypt.pass;
  
    const key = crypto.scryptSync(password, 'salt', 24);
    const iv = Buffer.from(valor.key, 'hex');
  
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(valor.db, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  module.exports = { decrypter }