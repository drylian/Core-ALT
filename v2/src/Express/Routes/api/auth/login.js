const express = require("express");
const router = express.Router();
const { config } = require('alter');
const methodNotAllowed = require("../../system/err405");

// Rota de exemplo
router.post("/exemplo", async (req, res) => {
    res.status(200).json({ message: "Isso é um Exemplo de post", token });
});

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
