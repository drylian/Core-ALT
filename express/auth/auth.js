const { db } = require('alter')
const tokens = db.tokens
module.exports = {
  AuthValite: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth/login');
  },
  AuthFormat: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    if (req.user.userType === 'admin') {
      return res.redirect('/admin');
    } else if (req.user.userType === 'client') {
      return res.redirect('/client');
    }
  },
  TokenValite: function (req, res, next) {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(401).json({ message: 'Cabeçalho de autorização ausente' });
    }

    const token = auth.split(' ')[1]; // Extrai apenas o valor do token do cabeçalho "Authorization"

    const tokenFound = Object.values(tokens).find(t => t === token);

    if (!tokenFound) {
      if (req.method === 'GET') {
        if (req.user.userType === 'admin') {
          return next();
        } else {
          // Verifica se é uma solicitação feita por navegador (client-side)
          if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return res.render('error/401'); // Renderiza uma página de erro/403
          } else {
            return res.status(403).json({ message: 'Token Inválido, Acesso proibido' }); // Retorna uma resposta de erro JSON para solicitações de API
          }
        }
      }
    } else {
      return next();
    }
  }
};