const crypto = require('crypto');

// Função para gerar um valor aleatório de 128 caracteres
const gen = (numero) => {
	numero = numero || '128'; // Define o valor padrão como '128' se não for fornecido nenhum valor ou se o valor fornecido for falsy
	let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	let valor = '';

	for (let i = 0; i < numero; i++) {
		const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
		valor += caracteres.charAt(indiceAleatorio);
	}

	return valor;
};

const gex = (numero) => {
	numero = numero || '128'; // Define o valor padrão como '128' se não for fornecido nenhum valor ou se o valor fornecido for falsy
	let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|:;\<>,.?/~`';

	let valor = '';

	for (let i = 0; i < numero; i++) {
		const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
		valor += caracteres.charAt(indiceAleatorio);
	}

	return valor;
};


const gec = () => {
	const currentDate = new Date().toISOString();
	const hash = crypto.createHash('sha256').update(currentDate).digest('hex');
	return hash;
};

module.exports = { gen, gex, gec };
