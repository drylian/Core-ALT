// Importar o sqlite3
const sqlite3 = require('sqlite3').verbose();

// Criar um banco de dados local
let db = new sqlite3.Database('./db/test.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the test database.');
});

// Criar uma tabela de usuários
db.run('CREATE TABLE users (name TEXT, email TEXT, age INTEGER)', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Table created.');
});

// Inserir um novo usuário
db.run('INSERT INTO users (name, email, age) VALUES (\'João\', \'joao@gmail.com\', 25)', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('User inserted.');
});

// Buscar um usuário pelo nome
db.get('SELECT * FROM users WHERE name = \'João\'', (err, row) => {
	if (err) {
		console.error(err.message);
	}
	console.log(row); // -> {name: "João", email: "joao@gmail.com", age: 25}
});

// Atualizar um usuário pelo email
db.run('UPDATE users SET age = 26 WHERE email = \'joao@gmail.com\'', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('User updated.');
});

// Deletar um usuário pelo id
db.run('DELETE FROM users WHERE rowid = 1', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('User deleted.');
});

// Fechar a conexão com o banco de dados
db.close((err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Close the database connection.');
});
