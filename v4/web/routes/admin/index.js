const express = require('express');
const { set, client, db } = require('alter')
const router = express.Router();
const theme = db.theme
// Rota principal /admin

router.get('/', (req, res) => {
  res.render('admin/home', { 
    profile:req.user,
    title: set.web_name,
    user:client.user.tag,
    avatar:client.user.avatarURL(),
    theme:theme
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('[ Web ] Erro ao fazer logout:', err);
      req.flash('error', 'Ocorreu um erro ao fazer logout. Por favor, tente novamente.');
      res.redirect('/admin/settings'); // Redirecionar para a página inicial ou para outra rota apropriada
      return;
    }

    req.flash('success', 'Deslogado com Sucesso');
    res.redirect('/auth/login');
  });
});


module.exports = router;