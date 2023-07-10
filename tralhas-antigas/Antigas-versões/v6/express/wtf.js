const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require("body-parser");
const { adminRoutes, clientRoutes, apiRoutes, rootRoutes } = require('./routes/routes');
const { AuthValite, TokenValite } = require('./auth/auth');
const router = express.Router();
const { SetupMode } = require('./routes/setup/setup');
const { set, client, gex, db, temp } = require('alter')
const path = require('path')

function initWeb(app, isSet) {
  let IsSetup = isSet
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

    /* Isso separa o modo setup e o normal */
    app.use(function (req, res, next) {
        router.get(router.use('/admin', require('./admin/index')))
    });

    // Rotas Api /api*
    app.use('/:router', TokenValite, function (req, res) {
        const router = req.params.router;
      try {
        apiRoutes(router)
      } catch (err) {
        console.log(`[ Web - Api ] Erro de Rota: ${err}`);
      }
    });

  } catch (err) {
    console.log(`[ Web ] Erro durante a inicialização: ${err}`);
  }
}

function CloseSetup() {
  IsSetup = null
}

module.exports = {initWeb , CloseSetup };