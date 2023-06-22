/**
 * Alternight JDB 2023
 * 
 * função principal do JDB, salva algo no banco de dados.
 * 
 * uso: dependencia, precisa de certas configurações para funcionar.
 * 
 */
const fs = require('fs');
const { encrypter } = require('./encrypter')
const { keyPath, dbPath } = require('../settings')
// Função para salvar o banco de dados no arquivo JSON
function saveDB(database) {
    const encryptedData = encrypter(JSON.stringify(database));
    const db = encryptedData.db;
    const key = encryptedData.key;

    // Lê o conteúdo atual do arquivo key.json (se existir)
    let keyConfig = {};
    if (fs.existsSync(keyPath)) {
        const keyFileContent = fs.readFileSync(keyPath, 'utf8');
        keyConfig = JSON.parse(keyFileContent);
    }

    keyConfig.key = key;
    const keyConfigJson = JSON.stringify(keyConfig, null, 2);

    fs.writeFileSync(keyPath, keyConfigJson);

    // Salva a parte criptografada do banco de dados
    fs.writeFileSync(dbPath, db);
}
module.exports = { saveDB }