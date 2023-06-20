const express = require('express');
const { set,client } = require('alter')
const router = express.Router();

// Rota principal /
router.get('/', (req, res) => {
  res.render('index', { 
    title: set.web_name,
    avatar:client.user.avatarURL()
  });
});

module.exports = router;