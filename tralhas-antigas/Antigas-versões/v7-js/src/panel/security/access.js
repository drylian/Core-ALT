// Função de verificação do acesso
const { db } = require('alter');
const set = db.get('config');
const temp = db.get('temp');
const bot = db.get('discord');

async function valide(req, res) {
	if (req.isAuthenticated()) {
		if (!req.user.id) {
			return res.redirect('/auth/login');
		}
		if (set.web_admin_id.split(',').includes(req.user.id)) {
			return temp.admin;
		} else {
			return temp.client;
		}
	} else {
		return null;
	}
}

async function AccessCheck(app) {

	app.use('/:router', async function (req, res, next) {
		const router = req.params.router;
		if (router === 'admin') {
			const userType = await valide(req, res);
			if (userType) {
				if (userType === temp.admin) {
					// Caso seja administrador
					return next();
				} else if (userType === temp.client) {
					// Redireciona o cliente para a sua área
					return res.redirect('/client');
				}
			} else {
				return res.redirect('/auth/login');
			}
		} else if (router === 'client') {
			const userType = await valide(req, res);
			if (set.client_active) {
				// Caso a área do cliente esteja desativada
				return res.redirect('/');
			}
			if (userType) {
				if (userType === temp.admin || userType === temp.client) {
					return next();
				}
			} else {
				return res.redirect('/auth/login');
			}
		} else if (router === 'api') {
			const userType = await valide(req, res);

			if (userType) {
				if (userType === temp.admin) {
					return next();
				} else {
					// Verifica se é uma solicitação feita por navegador (client-side)/(guest-side)
					if (req.headers.accept && req.headers.accept.includes('text/html')) {
						return res.status(403).render('errors/403', {
							title: set.web_name,
							avatar: bot.client.avatarURL
						});
					}
				}
			} else {

				const auth = req.headers.authorization;

				if (!auth) {
					return res.status(401).json({ message: 'Cabeçalho de autorização ausente' });
				}

				if (db.get('tokens')) {
					const token = auth.split(' ')[1]; // Extrai apenas o valor do token do cabeçalho "Authorization"
					const tokenFound = db.find('tokens', token);

					if (tokenFound) {
						const attTime = {
							[tokenFound.data_id]: {
								last_use: new Date()
							}
						};

						db.set('tokens', {
							...attTime
						});

						return next();
					} else {
						return res.status(403).json({ message: 'Token Inválido, Acesso proibido' });
					}
				} else {
					return res.status(403).json({ message: 'Esta aplicação não possui tokens' });
				}
			}
		} else {
			// Para rotas que não precisa de autenticação
			return next();
		}
	});

	// Sistema de redirect
	app.get('/auth/login/redirect', async (req, res) => {
		const UserType = await valide(req, res);
		if (UserType) {
			if (UserType === temp.admin) {
				return res.redirect('/admin');
			} else if (UserType === temp.client) {
				return res.redirect('/client');
			}
		} else {
			return res.redirect('/auth/login');
		}
	});
}

module.exports = AccessCheck;
