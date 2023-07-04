const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
// Gera tokens temporarios usados no painel
function panelInit(app) {
	return new Promise((resolve) => {
		try {
			const { db } = require('alter');
			const { style } = require('alter/panel');
			const initPass = require('./security/pass');
			const AccessCheck = require('./security/access');
			const routerInit = require('./routes');
			const set = db.get('config');
			const bot = db.get('discord');
			const temp = db.get('temp');

			// Configurações do aplicativo
			app.set('view engine', 'ejs');
			app.set('views', path.join(__dirname, 'views'));
			app.use(express.static('./src/panel/public'));
			app.use(express.static('./src/panel/styles'));
			app.use(express.urlencoded({ extended: true, limit: '5mb' }));
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({ extended: true }));
			app.use(fileUpload());
			app.use(cookieParser());

			// Configura o Passport
			initPass(passport);

			// Inicia a Sessão do express
			const sessionToken = temp.session;
			console.log('[ Panel - Session ] Token dessa sessão: ' + sessionToken);
			app.use(
				session({
					secret: sessionToken,
					resave: false,
					saveUninitialized: true
				})
			);

			// Inicialização do Passport e configuração da sessão
			app.use(passport.initialize());
			app.use(passport.session());

			// inicia o flash
			app.use(flash());

			// Variantes Globais
			app.use(function (req, res, next) {
				res.locals.success = req.flash('success');
				res.locals.error = req.flash('error');
				next();
			});

			// Validação Global
			// Sistema de segurança, desative isso e toda segurança vai sumir,
			// util para manutenções em areas de login 
			// AccessCheck(app);

			let callCount = 0;

			app.use('/', (req, res, next) => {
				if (req.originalUrl === '/robots.txt') {
					next();
					return;
				}

				console.log(`Call to ${req.originalUrl} (${callCount++})`);
				next();
			});

			// Carrega todas as rotas do painel
			routerInit(app);

			// Middleware para lidar com erro 500 (Internal Server Error)
			app.use(function (err, req, res) {
				const currentStyle = style.init();
				db.config = db.get('config');
				const url = `${db.config.web_url}:${db.config.web_port}`;
				console.log('[ Panel - ] erro:' + err);
				res.status(500).render('errors/500', {
					style: currentStyle,
					urlloader: url,
					title: set.web_name,
					avatar: bot.client.avatarURL
				});
			});

			// Middleware para lidar com erro 404 (Página não encontrada)
			app.use(function (req, res) {
				res.status(404).render('errors/404', {
					title: set.web_name,
					avatar: bot.client.avatarURL
				});
			});

			resolve(set.web_port);
		} catch (err) {
			console.log('[ WEB ] erro:' + err);
		}
	});
}
module.exports = { panelInit };