const fs = require('fs');
const { encrypter } = require('./OLD/v1/encrypter');
const { ConfigPath, local } = require('../settings');
const folder = require('./folder');
const dbPath = local+'/json'
folder(dbPath);

// Função para salvar o banco de dados no arquivo JSON
function saveDBFLD(database) {
  // Lê o conteúdo atual do arquivo key.json (se existir)
  let keyConfig = {};
  if (fs.existsSync(ConfigPath)) {
    const keyFileContent = fs.readFileSync(ConfigPath, 'utf8');
    keyConfig = JSON.parse(keyFileContent);
  }

  const encryptedData = encrypter(JSON.stringify(database));
  const key = encryptedData.key;

  keyConfig.key = key;
  const keyConfigJson = JSON.stringify(keyConfig, null, 2);

  fs.writeFileSync(keyPath, keyConfigJson);

  // Salva cada "field" em um arquivo separado
  for (const field in database) {
    const fieldValue = database[field];
    const fieldPath = `${dbPath}/${field}.json`;
    const fieldData = JSON.stringify(fieldValue);
    fs.writeFileSync(fieldPath, fieldData);
  }
}

// Função para carregar o banco de dados do arquivo JSON
function loadDBFLD() {
  const database = {};

  // Carrega cada "field" de um arquivo separado
  const files = fs.readdirSync(dbPath);
  for (const file of files) {
    const field = file.split('.json')[0];
    const filePath = `${dbPath}/${file}`;
    const fieldData = fs.readFileSync(filePath, 'utf8');
    database[field] = JSON.parse(fieldData);
  }

  return database;
}

module.exports = { saveDBFLD, loadDBFLD };
