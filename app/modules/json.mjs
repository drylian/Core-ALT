import fs from 'fs';

function json(local) {
	let existingData
	if (fs.existsSync(local)) {
		existingData = fs.readFileSync(local, 'utf-8');
	} else {
		return {};
	}
	return JSON.parse(existingData);
}

function jsonvl(local) {
	if (fs.existsSync(local)) {
		return true;
	} else {
		return false;
	}
}

function jsonsv(local, data) {
	let existingData;

	if (fs.existsSync(local)) {
		existingData = json(local); // Lê o JSON original
	} else {
		existingData = {};
	}

	let valores = existingData;
	Object.assign(valores, data);

	const jsonData = JSON.stringify(valores, null, 2);
	fs.writeFileSync(local, jsonData);
}

export { json, jsonsv, jsonvl };
