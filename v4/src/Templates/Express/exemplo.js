const express = require("express");
const router = express.Router();

const methodNotAllowed = require("../system/err405");

// Rota de exemplo
router.post("/exemplo", async (req, res) => {
    res.status(200).json({ message: "Isso é um Exemplo de post", token });
});

// Middleware para método GET não permitido
router.get("/exemplo", methodNotAllowed);

module.exports = router;
