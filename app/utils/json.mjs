import fs from "fs";

function json(local) {
	let existingData;
	if (fs.existsSync(local)) {
		existingData = fs.readFileSync(local, "utf-8");
	} else {
		return {};
	}

	try {
		const parsedData = JSON.parse(existingData);
		return parsedData;
	} catch (err) {
		console.error("Erro ao analisar o JSON:", err.message);
		return {}; // Retorna um objeto vazio se o JSON não for válido
	}
}


function jsonsv(local, data) {
	function mergeObjects(target, source) {
		for (const key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {

				if (source[key] instanceof Object && !Array.isArray(source[key])) {
					target[key] = mergeObjects(target[key] || {}, source[key]);
				} else {
					target[key] = source[key];
				}
			}
		}
		return target;
	}

	let existingData;

	if (fs.existsSync(local)) {
		const valores = fs.readFileSync(local, "utf-8");
		try {
			existingData = JSON.parse(valores);
		} catch (err) {
			// Se ocorrer um erro na análise do JSON, limpar o arquivo
			fs.writeFileSync(local, JSON.stringify(data, null, 2));
			return;
		}
	} else {
		existingData = {};
	}

	mergeObjects(existingData, data);

	const jsonData = JSON.stringify(existingData, null, 2);
	fs.writeFileSync(local, jsonData);
}


export { json, jsonsv };
