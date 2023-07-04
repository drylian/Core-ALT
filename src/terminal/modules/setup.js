/*
 * Alternight 2023 - Todos os direitos reservados.
 * 
 * Sistema de perguntas do painel, serve para configurar 
 * as partes iniciais e necessarias para o painel funcionar.
 * 
 */

const colors = require('colors');
const { db } = require('alter');

async function valideConf() {
	return new Promise(async (resolve) => {
		const config = await db.get('config');
		console.log(config);
		if (
			
			config.bot_token &&
			config.bot_client &&
			config.bot_client_secret &&
			config.bot_callback_url &&
			config.web_name &&
			config.web_port &&
			config.web_url &&
			config.web_admin_id
		) {
			console.log(`[ ${colors.cyan('Core')} ] Sistema configurado, pulando setup...`);
			resolve(true);
		} else {
			console.log(`
                                      [ ${colors.cyan('Core')} ]
                                      
               Foi detectado que o servidor ainda não foi configurado, 
            e por conta disso estaremos iniciando o modo de configuração
                          Iniciando em 10 Segundos.`);
			setTimeout(() => {
				console.clear();
				resolve(setup());
			}, 10000);

		}
	});
}

async function setup() {
	return new Promise(async (resolve) => {

		console.log(`[ ${colors.cyan('Core')} ] Vamos começar, resposta essas 8 perguntas antes de podermos iniciar o servidor.
    `);

		const config = await db.get('config');

		const questions = [
			{
				key: 'bot_token',
				question: 'Digite o token do bot',
				desc: 'link do portal do desenvolvedor para obter o token: https://discord.com/developers/applications'
			},
			{
				key: 'bot_client',
				question: 'Digite o clientID',
				desc: 'é obtido no portal do desenvolvedor: https://discord.com/developers/applications'
			},
			{
				key: 'bot_client_secret',
				question: 'Digite o client Secret do discord',
				desc: 'é obtido no portal do desenvolvedor: https://discord.com/developers/applications'
			},
			{
				key: 'bot_callback_url',
				question: 'Digite a discord Callback',
				desc: '0auth do bot,deve ser adicionado no https://discord.com/developers/applications, exemplo "http://exemplo.meu/auth/login/api", "/auth/login/api" é necessario estar na frente do link.',
				padrao: 'localhost:3000/auth/login/api'
			},
			{
				key: 'web_name',
				question: 'Digite o nome da web',
				desc: 'Nome que será exibido para as pessoas, de diversas formas diferentes.',
				padrao: 'Core'
			},
			{
				key: 'web_port',
				question: 'Digite a porta do painel',
				desc: `Porta que vai ser usada para executar o painel na internet,
            normalmente usasse a "3000" por padrão.`,
				padrao: '3000'
			},
			{
				key: 'web_url',
				question: 'Digite a URL da web',
				desc: `Link que será usado para algumas funções, deve ser o mesmo usado na
            callback, porem sem o "/auth/login/api".`,
				padrao: 'localhost'
			},
			{
				key: 'web_admin_id',
				question: 'Digite o ID do administrador da web',
				desc: `Id dos administradores do painel, pode ser obtido usando
            "@seuNomeDoDiscord" em um chat privado ou copiando o id do pelo discord , no modo
            desenvolvedor, separe os administradores por "," exemplo "123456789,123456789"`,
			}
		];

		const askQuestion = async (index) => {
			if (index >= questions.length) {
				// finaliza a configuração
				resolve(true);
				console.log(`[ ${colors.cyan('Core')} ] Configuração terminada, continuando iniciação...`);
				return;
			}

			const { key, question, desc, padrao } = questions[index];

			console.log(`[ ${colors.cyan('Core')} ] ${desc}\n`);
			if (!padrao) {
				process.stdout.write(question + ':');
			} else {
				process.stdout.write(question + `(padrão:${padrao}):`);
			}


			process.stdin.once('data', (data) => {
				const input = data.toString().trim();

				const valueToSet = input.length > 0 ? input : padrao; // Usa o valor padrão se nenhum valor for inserido

				if (!valueToSet && !padrao) {
					console.clear();
					console.log(`[ ${colors.red('Aviso')} ] Este campo é necessário. Por favor, insira um valor válido.\n`);
					askQuestion(index);
					return;
				}

				process.stdout.write(`[ ${colors.cyan('Core')} ] Você configurou "${key}" como "${valueToSet}". Tem certeza? (s/n): `);

				process.stdin.once('data', async (confirmation) => {
					const confirmInput = confirmation.toString().trim().toLowerCase();

					if (confirmInput.toLowerCase().startsWith('s') || confirmInput.toUpperCase().startsWith('S')) {
						await db.set('config', { [key]: valueToSet });
						config[key] = valueToSet;
						console.log(`[ ${colors.cyan('Core')} ] Configurado "${key}" como "${valueToSet}"\n`);
						console.clear();
						askQuestion(index + 1);
					} else if (confirmInput.toLowerCase().startsWith('n') || confirmInput.toUpperCase().startsWith('N')) {
						askQuestion(index);
					} else {
						console.log(`[ ${colors.cyan('Core')} ] Por favor, responda com "s/S" ou "n/N".\n`);
						askQuestion(index);
					}
				});
			});
		};

		askQuestion(0);
	});
}
module.exports = { valideConf, setup };