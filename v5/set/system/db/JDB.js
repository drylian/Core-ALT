/*
 * Alternight JDB 2023
 *
 * Logica de Campo, um campo equivale a um "json" , tendo todo seu conteudo cryptografado .
 *
 * Logica de Chave, a chave é uma função dentro do json, seta "algo": "valor", a chave é "algo".
 *
 * Logica do db.set('campo', {chave:'valor'}) .
 *
 * Logica do db.get('campo') ou db.get('all') caso seja um valor "campo" voce obterá o json do
 * do "campo", porem usar "all" voce obterá dados do database inteiro.
 * 
 * Logica do db.del('campo','chave') ou db.del('campo','chave:algo') deleta a chave do "campo" 
 * ou mais expecificamente se precisar db.del('campo','chave:algo')que seria:
 * {
 *    campo:{
 *        chave:{
 *            algo
 *            }
 *        }
 *    }
 * }
 * 
 * Logica do db.drop('campo') deleta completamente o "campo" do database.
 * 
 * Logica do db.exp('campo', './arquivo.json') exporta a data do "campo" para um arquivo externo. limitado a ".json"
 * 
 * Logica do db.imp('campo', './arquivo.json') importa a data de um arquivo externo para o database interno. limitado a ".json"
 * 
 * Logica do db.dropall('chave do database') AVISO, ESSA LOGICA VAI CRIAR UM BACKUP 
 * E ZERAR O BANCO DE DADOS COMPLETAMENTE, CRIANDO UM NOVO VAZIO.
 * 
 */

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const colors = require('colors')
const { JDBM } = require('./JDBM')

function gnu(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let pass = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    pass += charset.charAt(randomIndex);
  }
  return pass;
}

function create(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`[ ${colors.cyan('JDB')} ] Pasta de data foi criada.`);
  }
}

//Cria pasta se n existir
create('./set/system/db/data')
const dbPath = './set/system/db/data/JDB.db';
const keyPath = './set/system/db/data/key.json';

// Configuração de chave
if (fs.existsSync(keyPath)) {
  const crypt = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));

  if (!crypt.pass) {
    const crypt = {
      key: 'NotGerate',
      pass: gnu(32),
      logs_display: 'off',
      logs: 'on'
    };

    const savepass = JSON.stringify(crypt, null, 2);
    fs.writeFileSync(keyPath, savepass);
    console.log(`[ ${colors.cyan('JDB')} ] Senha de criptografia criada com sucesso.`);
  } else {
    console.log(`[ ${colors.cyan('JDB')} ] Senha de criptografia encontrada.`);
  }
} else {
  console.log(`[ ${colors.cyan('JDB')} ] Senha de criptografia não detectada, gerando uma nova.`);

  const crypt = {
    key: 'NotGerate',
    pass: gnu(32),
    logs_display: 'off',
    logs: 'on'
  };

  const savepass = JSON.stringify(crypt, null, 2);
  fs.writeFileSync(keyPath, savepass);
  console.log(`[ ${colors.cyan('JDB')} ] Senha de criptografia criada com sucesso.`);
}

const crypt = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));

// Função para carregar o banco de dados do arquivo JSON
function loadDatabase() {
  try {
    const data = fs.readFileSync(dbPath);
    const encryptedData = JSON.parse(data);
    return JSON.parse(decryptValue(encryptedData));
  } catch (error) {
    console.log(error)
    // Se o arquivo não existe ou está vazio, retorna um objeto vazio
    return {};
  }
}

// Função para carregar o banco de dados do arquivo JSON
function loadDatabase() {
  try {
    const db = fs.readFileSync(dbPath, 'utf8');
    const key = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));
    const encryptedData = {
      db: db,
      key: key.key
    };
    return JSON.parse(decryptValue(encryptedData));
  } catch (error) {
    console.error('Erro ao carregar o banco de dados:', error);
    // Se o arquivo não existe ou está vazio, retorna um objeto vazio
    return {};
  }
}


// Função para salvar o banco de dados no arquivo JSON
function saveDatabase(database) {
  const encryptedData = encryptValue(JSON.stringify(database));
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

// Configuração de databse
if (fs.existsSync(dbPath)) {
  console.log(`[ ${colors.cyan('JDB')} ] Banco de dados iniciado.`);
} else {
  console.log(`[ ${colors.cyan('JDB')} ] Banco de dados não detectado, criando um novo.`);

  // Cria um novo banco de dados vazio
  saveDatabase({});

  console.log(`[ ${colors.cyan('JDB')} ] Banco de dados criado com sucesso.`);
}

function encryptValue(value) {
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

// Função para descriptografar um valor
function decryptValue(encryptedValue) {
  const algorithm = 'aes-192-cbc';
  const password = crypt.pass;

  const key = crypto.scryptSync(password, 'salt', 24);
  const iv = Buffer.from(encryptedValue.key, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedValue.db, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Função auxiliar para formatar a data atual /* LOGS */
function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = String(currentDate.getFullYear());
  return `${day}-${month}-${year}`;
}

// Função auxiliar para registrar a mensagem em um arquivo de log /* LOGS */
function logMessage(message, isError) {
  if (crypt.logs_display === "on") {
    if (!isError) {
      console.log(`[ ${colors.cyan('JDB')} ] ` + colors.green(message));
    } else {
      console.log(`[ ${colors.cyan('JDB') + ' - ' + colors.red('ERRO')} ] ` + colors.red(message));
    }
  }
  if (crypt.logs === "on") {
    const logDirectory = './logs/database';
    const currentDate = getCurrentDate();
    const logFilePath = path.join(logDirectory, `${currentDate}.db_content.logs`);

    fs.mkdirSync(logDirectory, { recursive: true });
    fs.appendFileSync(logFilePath, `[ JDB-Logs ] ${message}\n`);
  }
}

// Função principal para manipular o banco de dados
const db = {
  // Adiciona/Atualiza um campo
  set: function (field, data) {
    const database = loadDatabase();
  
    if (!database[field] || typeof database[field] !== 'object') {
      database[field] = {};
    }
  
    for (const key in data) {
      database[field][key] = data[key];
    }
  
    saveDatabase(database);
    logMessage(`Field '${field}' atualizado`);
  },  
  get: function (field) {
    const database = loadDatabase();
    if (field === 'all') {
      logMessage(`Banco de dados foi desencriptado(get"ALL")`);
      return database;
    } else if (!database[field]) {
      logMessage(`Field '${field}' não existe.`);
      return null;
    } else {
      logMessage(`Field '${field}' foi desencriptado.`);
      return database[field]
    }
  },
  del: function (field, key) {
    const database = loadDatabase();
    if (database[field] && typeof database[field] === 'object') {
      const keys = key.split(':').map((k) => k.trim());
      const lastKey = keys.pop();
      let obj = database[field];
      for (const k of keys) {
        if (obj[k] && typeof obj[k] === 'object') {
          obj = obj[k];
        } else {
          return false;
        }
      }
      if (lastKey in obj) {
        delete obj[lastKey];
        saveDatabase(database);
        logMessage(`Key '${key}' deletada do campo '${field}'`);
        return true;
      }
    }
    return false;
  },
  drop: function (field) {
    const database = loadDatabase();
    if (field in database) {
      delete database[field];
      saveDatabase(database);
      logMessage(`field '${field}' deletado`);
      return true;
    }
    return false;
  },
  dropall: function (key) {
    const database = loadDatabase();
    const cryptKey = crypt.pass;

    if (key === cryptKey) {
      const currentDate = getCurrentDate();
      const backupFileName = `${currentDate}-backup-db.json`;
      const backupPath = `./${backupFileName}`;
      console.log(database)

      // Cria o backup do banco de dados desencriptado
      const backupData = {
        backup: {
          nome: `Backup Automatico por dropAll - Alter JDB`,
          descrição: "Uma solicitação de deletar o banco de dados foi realizda,",
          timestamp: new Date().toString(),
        },
        data: database
      };

      const backupDataJson = JSON.stringify(backupData, null, 2);
      fs.writeFileSync(backupPath, backupDataJson);

      // Deleta o banco de dados atual
      fs.unlinkSync(dbPath);

      // Cria um novo banco de dados vazio
      saveDatabase({});

      logMessage('Todo o banco de dados foi excluído', false);
      return true;
    } else {
      logMessage('A chave fornecida não corresponde à chave do banco de dados', true);
      return false;
    }
  },
  exp: function (field, filePath) {
    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      const loadData = JSON.parse(jsonData);
      if (!loadData) {
        logMessage(`Erro: Formato JSON inválido para exportação do campo '${field}'`);
        return false; // Invalid JSON format
      }
    }

    if (!filePath.endsWith('.json')) {
      logMessage(`Erro: Formato de arquivo inválido para exportação do campo '${field}'`);
      return false; // Invalid file format
    }

    const database = loadDatabase();
    if (database[field]) {
      const data = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
      const tempo = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

      const exportData = {
        export: {
          name: `${field} - Exportada do JDB`,
          description: 'Campo exportado do JDB',
          data: data + ' - ' + tempo
        },
        data: database[field]
      };
      const jsonData = JSON.stringify(exportData, null, 2);
      fs.writeFileSync(filePath, jsonData);
      logMessage(`Campo '${field}' exportado para o arquivo '${filePath}'`);
      return true;
    }
    return false;
  },
  imp: function (field, filePath) {
    if (!filePath.endsWith('.json')) {
      logMessage(`Erro: Formato de arquivo inválido para importação no campo '${field}'`);
      return false; // Invalid file format
    }

    try {
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      const importedData = JSON.parse(jsonData);
      if (!importedData) {
        logMessage(`Erro: Formato JSON inválido para importação no campo '${field}'`);
        return false; // Invalid JSON format
      }

      const database = loadDatabase();
      database[field] = importedData.data;
      saveDatabase(database);
      logMessage(`Campo '${field}' importado do arquivo '${filePath}'`);
      return true;
    } catch (error) {
      logMessage(`Erro: Falha ao importar o campo '${field}' do arquivo '${filePath}' erro:` + error, error);
      return false;
    }
  },
  log: function (message) {
    console.log(message);
    const currentDate = getCurrentDate();
    const logFilePath = `./logs/database/${currentDate}.db_content.logs`;
    fs.appendFileSync(logFilePath, `${message}\n`);
  }
};

logMessage('Iniciando verificação/instalação de models para a db')
/* Respo para carregar os Models do database */
JDBM(db, logMessage)

logMessage('Configurações do Banco de dados')

logMessage(db.get('all'))

module.exports = { db };