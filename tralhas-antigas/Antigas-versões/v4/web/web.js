const express = require('express')
const fileUpload = require('express-fileupload')
const { set, client } = require('alter') 
const path = require('path')

function initWeb(app) {
  // Controladores de Rotas
  const { freeRoutes } = require('./routes/free/free');
  const { adminRoutes } = require('./routes/admin/admin');
  const apiRoutes = require('./routes/api/api');
  try {
    // Configurações do aplicativo
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));;
    app.use(express.static('./web/public'));
    app.use(express.static('./web/themes'));
    app.use(express.urlencoded({ extended: true, limit: '5mb' }));
    app.use(fileUpload());

    // Rotas da Aplicação
    freeRoutes(app)
    app.use('/api', apiRoutes);
    adminRoutes(app)

    app.use('/auth/login', require('./routes/free/auth/login'));
  
    // Middleware para lidar com erro 500 (Internal Server Error)
    app.use(function (err, req, res, next) {
      console.error(err.stack);
      res.status(500).render('errors/500', { 
        title: set.web_name,
        avatar:client.user.avatarURL() });
    });

    // Middleware para lidar com erro 404 (Página não encontrada)z
    app.get('*', (req, res) => {
      res.status(404).render('errors/404', { 
        title: set.web_name,
        avatar:client.user.avatarURL()
       });
    });

  } catch (err) {
    console.log(`[ Web ] Erro durante a inicialização: ${err}`);
  }
}

module.exports = initWeb;