const { Database } = require('simpl.db');

const db = {};

db.slash = new Database({ dataFile: './discord/Database/Core/slash.json' });
db.slash_log = new Database({ dataFile: './discord/Database/Logs/slash.json' });
db.event = new Database({ dataFile: './discord/Database/Core/event.json' });
db.event_log = new Database({ dataFile: './discord/Database/Logs/event.json' });
db.accounts = new Database({ dataFile: './discord/Database/Core/accounts.json' });

module.exports = { db };
