const express = require("express");
const router = express.Router();
const { db } = require("alter");

// Rota GET para obter o conteúdo do banco de dados "slash"
router.get("/settings/slash", (req, res) => {

  const slashData = db.slash; // Obtém todos os dados do banco de dados "slash"
  res.status(200).json(slashData); // Retorna os dados em formato JSON
});

// Rota PUT para editar o comando
router.put("/settings/slash/", (req, res) => {
    const commandName = req.body;
    let command = null;
    
    for (const key in db.slash) {
      if (db.slash[key].name === commandName) {
        command = db.slash[key];
        break;
      }
    }
    
    if (!command) {
      return res.status(404).json({ message: "Comando não encontrado." });
    }
  
    const { active } = req.body;
  
    command.active = active;
  
    db.slash.save();
  
    res.status(200).json({ message: "Comando atualizado com sucesso." });
  });
module.exports = router;
