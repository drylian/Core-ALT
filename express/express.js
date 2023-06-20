const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require("body-parser");
const { adminRoutes, clientRoutes, apiRoutes, rootRoutes } = require('./routes/routes');
const { AuthValite, TokenValite } = require('./auth/auth');
const router = express.Router();
const { set, client, gex, db, temp } = require('alter')
const path = require('path')

function initWeb(app) {
  try {
    // Configurações do aplicativo
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));;
    app.use(express.static('./express/public'));
    app.use(express.static('./express/themes'));
    app.use(express.urlencoded({ extended: true, limit: '5mb' }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(fileUpload());

    // Auth Password
    require('./auth/passport')(passport);

    // Express session
    const sessionToken = temp.session
    console.log('[ Web - Session ] Token dessa sessão: ' + sessionToken)
    app.use(
      session({
        secret: sessionToken,
        resave: true,
        saveUninitialized: true
      })
    );

    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Conecta o flash
    app.use(flash());

    // Variantes Globais
    app.use(function (req, res, next) {
      res.locals.success = req.flash('success');
      res.locals.error = req.flash('error');
      next();
    });

    // Rotas Api /api*
    app.use('/api*', TokenValite, function (req, res) {
      try {
        apiRoutes(router)
      } catch (err) {
        console.log(`[ Web - Api ] Erro de Rota: ${err}`);
      }
    });

    // Rotas Admin /admin*
    app.get('/admin*', AuthValite, function (req, res) {
      if (req.user.userType === 'admin') {
        try {
          adminRoutes(router)
        } catch (err) {
          console.log(`[ Web - Admin ] Erro de Rota: ${err}`);
        }
      } else if (req.user.userType === 'client') {
        // Redirecionar para o client
        res.redirect('/client');
      } else {
        // Redirecionar para o login
        res.redirect('/auth/login');
      }
    });

    // Rotas Client /client*
    app.get('/client*', AuthValite, function (req, res) {
      if (req.user.userType === temp.client ?? req.user.userType === temp.admin) {
        try {
          clientRoutes(router)
        } catch (err) {
          console.log(`[ Web - Cliente ] Erro de Rota: ${err}`);
        }
      } else {
        // Redirecionar para o login
        res.redirect('/auth/login');
      }
    });

    // Rotas Raiz /
    app.get('/', function (req, res) {
      try {
        rootRoutes(router)
      } catch (err) {
        console.log(`[ Web - Raiz ] Erro de Rota: ${err}`);
      }
    });

    // Middleware para lidar com erro 500 (Internal Server Error)
    app.use(function (err, req, res, next) {
      console.error(err.stack);
      res.status(500).render('errors/500', {
        title: set.web_name,
        avatar: client.user.avatarURL()
      });
    });

    // Middleware para lidar com erro 404 (Página não encontrada)z
    app.get('*', (req, res) => {
      res.status(404).render('errors/404', {
        title: set.web_name,
        avatar: client.user.avatarURL()
      });
    });

  } catch (err) {
    console.log(`[ Web ] Erro durante a inicialização: ${err}`);
  }
}

module.exports = initWeb;