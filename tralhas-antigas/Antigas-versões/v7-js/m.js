const CryptoJS = require("crypto-js");
const data = "Desconectado do banco de dados (SQLite)"
const encryptionKey = "123456"
console.log('Palavra usada:' + data)
const encryptado = encryptData(data)
console.log('Palavra usada:' + encryptado)
// Função para criptografar os dados
function encryptData(data) {
    const jsonData = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(jsonData, encryptionKey).toString();
    return encryptedData;
}

// Função para descriptografar os dados
function decryptData(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    const jsonData = bytes.toString(CryptoJS.enc.Utf8);
    const decryptedData = JSON.parse(jsonData);
    return decryptedData;
}
