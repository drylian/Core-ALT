
const { bearer } = require('alter');
const express = require('express');
const router = express.Router();

try {
// Verificação de autenticação Bearer para a rota "/api/"
router.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: 'Cabeçalho de autorização ausente' });
  }

  const token = auth.split(' ')[1];
  if (!bearer || !bearer.value || bearer.value !== token) {
    return res.status(401).json({ message: 'Token Inválido, acesso proibido.' });
  }

  // O token é válido, continue com a próxima rota
  next();
});

// Rotas de Api /api/*
router.use('/', require('./index.js'));

} catch (err) {
  console.log(`[ Web - Api ] Erro de Rota: ${err}`);
}
module.exports = router;