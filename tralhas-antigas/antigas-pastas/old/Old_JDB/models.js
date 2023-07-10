const { gnu }= require('./src/functions/gnu');
async function JDBM(db, log) {
	return new Promise((resolve) => {
		/*
		 * Alternight JDB 2023
		 *
		 * Models do JDB, Serve para pre-carregar arquivos
		 * dentro do DB, antes de adicionar qualquer conteudo,
		 * para garantir que todo conteúdo seja lido corretamente;
		 * 
		 */

		if (!db.get('config')) {
			log('"config" não existe, criando field...');
			db.set('config', {
				bot_token: '',
				bot_client: '',
				bot_client_secret: '',
				bot_callback_url: '',
				web_name: '',
				web_port: '',
				web_url: '',
				web_admin_id: '',
			});
		}

		if (!db.get('style')) {
			log('"style" não existe, criando field...');
			db.set('style', {
				style: 'default'
			});
		}

		if (!db.get('switchs')) {
			log('"switchs" não existe, criando field...');
			db.set('switchs', {
				client_active: 'off',
				gmx_active: 'off',
				api_active: 'on',
			});
		}
		
		if (!db.get('status')) {
			log('"status" não existe, criando field...');
			db.set('status', {
				on: 'off',
				status: '',
				auto: 'off',
				cron: 'off',
				type: 'Playing,Listening,Watching,Competing,Streaming'// Configuração padrão
			});
		}

		if (!db.get('alert')) {
			log('"alert" não existe, criando field...');
			db.set('alert', {
				message: '',
				color: '',
				backgroundColor: '',
				admin: 'off',
				client: 'off',
				expires: 'off',
			});
		}
		
		// Codigos temporarios
		db.set('temp', {
			session: gnu(128),
			admin: gnu(128),
			client: gnu(128)
		});

		resolve(true);
	});
}
module.exports = { JDBM };