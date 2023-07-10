const { Database } = require('simpl.db');

const db = {};

db.slash = new Database({ dataFile: './src/Database/Core/slash.json' });
db.slash_log = new Database({ dataFile: './src/Database/Logs/slash.json' });
db.event = new Database({ dataFile: './src/Database/Core/event.json' });
db.event_log = new Database({ dataFile: './src/Database/Logs/event.json' });
db.accounts = new Database({ dataFile: './src/Database/Core/accounts.json' });

module.exports = { db };
