const express = require("express");
const router = express.Router();
const { db } = require('alter');
const config = db.get('config')
const methodNotAllowed = require("../../system/err405");

// Rota para verificar a senha de admin
router.post('/auth/login', (req, res) => {
  const { pass } = req.query;
  const adminPass = config.express.admin;

  if (pass === adminPass) {
    // Define o cookie de autenticação
    res.cookie('adminAuth', pass);
    res.send({ success: true });
  } else {
    // Remove o cookie de autenticação
    res.clearCookie('adminAuth');
    res.send({ success: false });
  }
});


// Middleware para método GET não permitido
router.get("/auth/login", methodNotAllowed);

module.exports = router;
