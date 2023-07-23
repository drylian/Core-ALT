const sqlite3 = require("sqlite3").verbose();
const CryptoJS = require("crypto-js");

// Chave de criptografia (mantenha em segredo!)
const encryptionKey = "sua-chave-de-criptografia-secreta";

async function connect() {
  return new sqlite3.Database("./test.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Conectado ao Banco de Dados (SQLite).");
  });
}

async function disconnect(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err.message);
      }
      console.log("Desconectado do banco de dados (SQLite).");
      resolve();
    });
  });
}

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

// Função para converter o JSON em colunas
function convertJSONToColumns(data, prefix = "") {
  let columns = {};
  for (let key in data) {
    if (typeof data[key] === "object" && data[key] !== null) {
      const subColumns = convertJSONToColumns(data[key], `${prefix}${key}_`);
      columns = { ...columns, ...subColumns };
    } else {
      columns[`${prefix}${key}`] = data[key];
    }
  }
  return columns;
}

// Função para converter colunas em JSON
function convertColumnsToJSON(columns) {
  let data = {};
  for (let key in columns) {
    const keys = key.split("_");
    let obj = data;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) {
        obj[keys[i]] = {};
      }
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = columns[key];
  }
  return data;
}

// Função para atualizar os dados no banco de dados
async function updateData(tableName, data, db) {
  const jsonData = await get(tableName, db);
  const existingData = jsonData ? decryptData(jsonData.data) : {};
  const mergedData = { ...existingData, ...data };
  const encryptedData = encryptData(mergedData);
  return new Promise((resolve, reject) => {
    db.run(`UPDATE ${tableName} SET data = ?`, encryptedData, function (err) {
      if (err) {
        reject(new Error(`Erro ao atualizar dados: ${err.message}`));
      } else {
        resolve();
      }
    });
  });
}

// Função para salvar o banco de dados
async function saveDB(tableName, data) {
  try {
    const db = await connect();
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        // Verificar se a tabela já existe
        db.get(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`,
          (err, row) => {
            if (err) {
              reject(new Error(`Erro ao verificar tabela: ${err.message}`));
            } else {
              if (row) {
                // Tabela existe, atualizar dados
                updateData(tableName, data, db)
                  .then(() => {
                    resolve();
                  })
                  .catch((error) => {
                    reject(error);
                  });
              } else {
                // Tabela não existe, salvar dados
                const jsonData = encryptData(data);
                db.run(`CREATE TABLE ${tableName} (data TEXT)`, (err) => {
                  if (err) {
                    reject(new Error(`Erro ao criar tabela: ${err.message}`));
                  } else {
                    db.run(
                      `INSERT INTO ${tableName} (data) VALUES (?)`,
                      jsonData,
                      function (err) {
                        if (err) {
                          reject(
                            new Error(`Erro ao inserir dados: ${err.message}`)
                          );
                        } else {
                          resolve();
                        }
                      }
                    );
                  }
                });
              }
            }
          }
        );
      });
    }).then(() => {
      return disconnect(db);
    });
  } catch (error) {
    throw new Error(`Erro ao salvar o banco de dados: ${error.message}`);
  }
}

// Função para carregar o banco de dados
async function loadDB(tableName) {
  try {
    const db = await connect();
    if (tableName === "allfields") {
      const tables = await getAllTables(db);
      const mergedData = {};
      for (const table of tables) {
        const jsonData = await get(table, db);
        const columns = await getColumns(table, db);
        const decryptedData = decryptColumns(jsonData, columns);
        mergedData[table] = decryptedData;
      }
      await disconnect(db);
      return mergedData;
    } else {
      const jsonData = await get(tableName, db);
      const columns = await getColumns(tableName, db);
      const decryptedData = decryptColumns(jsonData, columns);
      await disconnect(db);
      return decryptedData;
    }
  } catch (error) {
    throw new Error(`Erro ao carregar o banco de dados: ${error.message}`);
  }
}

// Função para obter todas as tabelas do banco de dados
function getAllTables(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        const tables = rows.map((row) => row.name);
        resolve(tables);
      }
    });
  });
}

// Função para obter as colunas de uma tabela específica
function getColumns(tableName, db) {
  const query = `PRAGMA table_info(${tableName})`;
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        const columns = rows.map((row) => row.name);
        resolve(columns);
      }
    });
  });
}

// Função para obter o JSON armazenado em uma tabela específica
function get(tableName, db) {
  const query = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`;
  return new Promise((resolve, reject) => {
    db.get(query, (err, row) => {
      if (err) {
        reject(err.message);
      } else if (row) {
        const getDataQuery = `SELECT * FROM ${tableName}`;
        db.get(getDataQuery, async (err, result) => {
          if (err) {
            reject(err.message);
          } else if (result) {
            resolve(result);
          } else {
            resolve(null);
          }
        });
      } else {
        console.log(`A tabela ${tableName} não existe.`);
        resolve(null);
      }
    });
  });
}

// Função para descriptografar as colunas
function decryptColumns(data, columns) {
  const decryptedData = {};
  for (let column of columns) {
    if (data[column]) {
      decryptedData[column] = decryptData(data[column]);
    }
  }
  return decryptedData;
}

// Exemplo de uso: salvar e carregar o banco de dados
(async () => {
  try {
    // Salvar o banco de dados
    const largeJSON = {
      id: 1,
      name: "John Doe",
      age: 30,
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA"
      },
      hobbies: ["reading", "gaming", "traveling"],
      education: {
        degree: "Bachelor's",
        major: "Computer Science",
        university: "University of ABC"
      },
      workExperience: [
        {
          company: "XYZ Corporation",
          position: "Software Engineer",
          years: 5
        },
        {
          company: "ABC Inc.",
          position: "Web Developer",
          years: 3
        }
        // ... add more work experiences if needed
      ]
      // ... add more properties if needed
    };

    await saveDB("field", largeJSON);
    console.log("Database salvo.");

    // Carregar o banco de dados
    const loadedData = await loadDB("field");
    console.log("Carregado:", loadedData);

    // Carregar todas as tabelas
    const allData = await loadDB("allfields");
    console.log("Todas as data:", allData);
  } catch (error) {
    console.error(error);
  }
})();
