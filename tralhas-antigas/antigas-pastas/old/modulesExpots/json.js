const fs = require('fs');

async function json(local) {
	const jsonData = fs.readFileSync(local, 'utf-8');
	return JSON.parse(jsonData);
}

async function jsonsv(local, data) {
	const existingData = json(local); // Lê o JSON original
	const modifiedData = { ...existingData, ...data }; // Combina o JSON original com os dados modificados

	const jsonData = JSON.stringify(modifiedData, null, 2);
	fs.writeFileSync(local, jsonData);
}

module.exports = { json, jsonsv };
