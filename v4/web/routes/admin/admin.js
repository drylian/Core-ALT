const flash = require('connect-flash');
const { ensureAuthenticated, forwardAuthenticated } = require('../../auth/auth');
const session = require('express-session');
const passport = require('passport');
const { temp } = require('alter');

function adminRoutes(app) {
  try {
    // Token de Sessão temporario
    console.log(temp.session)

    // Auth Password
    require('../../auth/passport')(passport);

    // Express session
    app.use(
      session({
        secret: temp.session,
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

    // Rotas Admin /admin/* ou /, tu pode limitar se quiser, use "ensureAuthenticated" para boquear acesso para somente admin admins
    app.use('/admin', ensureAuthenticated, require('./index'));
    app.use('/admin', ensureAuthenticated, require('./routes/settings'));

  } catch (err) {
    console.log(`[ Web - Admin ] Erro de Rota: ${err}`);
  }
}
module.exports = { adminRoutes };
