const { config } = require('alter');
const cookieParser = require('cookie-parser');

const FrontEndRoutes = (express, path, buildPath, app) => {
  app.use(cookieParser());
  // Carrega sistema de erros
  const viewsPath = path.join(buildPath, '/Errors');

   // Middleware para autenticação de admin
  const adminAuthMiddleware = (req, res, next) => {
    // Verifica se o usuário está autenticado como admin
    if (!req.cookies.adminAuth || req.cookies.adminAuth !== config.express.admin) {
      // Remove o cookie de autenticação
      res.clearCookie('adminAuth');
      // Redireciona para a página de login
      res.redirect('/auth/login.html');
    } else {
      next(); // O usuário está autenticado, prosseguir para a próxima rota/middleware
    }
  };


  // Aplicar middleware de autenticação de admin para rotas que correspondam a /admin/*
  app.use('/admin/*', adminAuthMiddleware);

  // Carrega o diretório do frontend estático
  app.use(express.static(buildPath));

  // Middleware para lidar com erro 404
  app.use((req, res, next) => {
    res.status(404).sendFile(path.join(viewsPath, '404.html'));
  });

  // Middleware para lidar com erro 500
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(viewsPath, '500.html'));
  });
};

module.exports = FrontEndRoutes;
