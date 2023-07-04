const fs = require('fs');

async function json(local) {
	const jsonData = fs.readFileSync(local, 'utf-8');
	return JSON.parse(jsonData);
}

async function jsonsv(local, data) {
	const existingData = await json(local); // Lê o JSON original
	let valores = existingData;
	Object.assign(valores, data);

	const jsonData = JSON.stringify(valores, null, 2); // Serializa o objeto 'valores' ao invés de 'modifiedData'
	fs.writeFileSync(local, jsonData);
}

module.exports = { json, jsonsv };
