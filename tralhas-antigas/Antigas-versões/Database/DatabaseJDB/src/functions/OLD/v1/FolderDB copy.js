const sqlite3 = require('sqlite3').verbose();
const { encrypter } = require('./crypters/encrypter');
const { decrypter } = require('./crypters/decrypter');
const { encoder } = require('./crypters/encoder');
const { decoder } = require('./crypters/decoder');
const { dbPath } = require('../settings');

// Função para carregar o banco de dados do SQLite
function loadDBFLD() {
  const database = {};

  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    db.each('SELECT field, data FROM my_table', (err, row) => {
      if (err) {
        console.error(err);
      } else {
        const decodedField = decoder(row.field);
        const decryptedData = decrypter(row.data);
        database[decodedField] = decryptedData;
      }
    });
  });

  db.close();

  return database;
}

// Função para salvar o banco de dados no SQLite
function saveDBFLD(database) {
  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS my_table (field TEXT PRIMARY KEY, data TEXT)');

    const stmt = db.prepare('INSERT OR REPLACE INTO my_table (field, data) VALUES (?, ?)');
    for (const field in database) {
      const encodedField = encoder(field);
      const encryptedData = encrypter(database[field]);
      stmt.run(encodedField, encryptedData);
    }
    stmt.finalize();
  });

  db.close();
}

module.exports = { saveDBFLD, loadDBFLD };
