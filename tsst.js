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
                                // Tabela existe, mesclar dados antes de salvar
                                db.get(`SELECT data FROM ${tableName}`, (err, row) => {
                                    if (err) {
                                        reject(new Error(`Erro ao obter dados existentes: ${err.message}`));
                                    } else {
                                        const existingData = row ? decryptData(row.data) : {};
                                        const mergedData = { ...existingData, ...data };
                                        const jsonData = encryptData(mergedData);
                                        db.run(`UPDATE ${tableName} SET data = ?`, jsonData, function (err) {
                                            if (err) {
                                                reject(new Error(`Erro ao atualizar dados: ${err.message}`));
                                            } else {
                                                resolve();
                                            }
                                        });
                                    }
                                });
                            } else {
                                // Tabela não existe, salvar dados
                                const jsonData = encryptData(data);
                                db.run(`CREATE TABLE ${tableName} (data TEXT)`, (err) => {
                                    if (err) {
                                        reject(new Error(`Erro ao criar tabela: ${err.message}`));
                                    } else {
                                        db.run(`INSERT INTO ${tableName} (data) VALUES (?)`, jsonData, function (
                                            err
                                        ) {
                                            if (err) {
                                                reject(new Error(`Erro ao inserir dados: ${err.message}`));
                                            } else {
                                                resolve();
                                            }
                                        });
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
                mergedData[table] = jsonData;
            }

            await disconnect(db);
            return mergedData;
        } else {
            const jsonData = await get(tableName, db);
            await disconnect(db);
            return jsonData;
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

// Função para obter o JSON armazenado em uma tabela específica
function get(tableName, db) {
    const query = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`;

    return new Promise((resolve, reject) => {
        db.get(query, (err, row) => {
            if (err) {
                reject(err.message);
            } else if (row) {
                const getDataQuery = `SELECT data FROM ${tableName}`;
                db.get(getDataQuery, (err, row) => {
                    if (err) {
                        reject(err.message);
                    } else if (row && row.data) {
                        const decryptedData = decryptData(row.data);
                        resolve(decryptedData);
                    } else {
                        resolve({});
                    }
                });
            } else {
                console.log(`A tabela ${tableName} não existe.`);
                resolve({});
            }
        });
    });
}

// Exemplo de uso: salvar e carregar o banco de dados
(async () => {
    try {
        // Salvar o banco de dados
        const data = { nome: "valor" };
        await saveDB("field", data);
        console.log("Database salvo.");

        // Carregar o banco de dados
        const loadedData = await loadDB("field");
        console.log("Carregado:", loadedData);

        const loadedDatas = await loadDB("sss");
        console.log("Carregado:", loadedDatas);

        // Carregar todas as tabelas
        const allData = await loadDB("allfields");
        console.log("Todas as data:", allData);
    } catch (error) {
        console.error(error);
    }
})();
