const sqlite3 = require('sqlite3').verbose();
const { encoder } = require('./crypters/encoder');
const { decoder } = require('./crypters/decoder');
const { dbPath } = require('../settings');

// Função para carregar o banco de dados do SQLite
function loadDBFLD() {
	const database = {};

	const db = new sqlite3.Database(dbPath, (err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Connected to the database.');
	});

	db.serialize(() => {
		db.run('CREATE TABLE IF NOT EXISTS core_table (field TEXT PRIMARY KEY, data TEXT)', (err) => {
			if (err) {
				console.error(err.message);
			}
		});
		db.each('SELECT field, data FROM core_table', (err, row) => {
			if (err) {
				console.error(err);
			} else {
				const decodedField = decoder(row.field);
				const data = JSON.parse(row.data);
				database[decodedField] = data;
			}
		});
	});

	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Closed the database connection.');
	});

	return database;
}

// Função para salvar o banco de dados no SQLite
function saveDBFLD(database) {
	const db = new sqlite3.Database(dbPath, (err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Connected to the database.');
	});

	db.serialize(() => {
		db.run('CREATE TABLE IF NOT EXISTS core_table (field TEXT PRIMARY KEY, data TEXT)', (err) => {
			if (err) {
				console.error(err.message);
			}
		});

		const stmt = db.prepare('INSERT OR REPLACE INTO core_table (field, data) VALUES (?, ?)');
		for (const field in database) {
			const encodedField = encoder(field);
			const data = JSON.stringify(database[field]);
			stmt.run(encodedField, data);
		}
		stmt.finalize();
	});

	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Closed the database connection.');
	});
}

module.exports = { saveDBFLD, loadDBFLD };
