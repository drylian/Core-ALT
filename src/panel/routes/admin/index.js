const express = require('express');
const router = express.Router();
const { adm } = require('alter/panel');

router.get('/', async (req, res) => {
	const ejs = await adm('admin/home', req, res);
	res.send(ejs);
});

// Logout
router.get('/logout', (req, res) => {
	req.logout((err) => {
		if (err) {
			console.error('[ Web ] Erro ao fazer logout:', err);
			req.flash('error', 'Ocorreu um erro ao fazer logout. Por favor, tente novamente.');
			return;
		}

		req.flash('success', 'Deslogado com Sucesso');
		res.redirect('/auth/login');
	});
});


module.exports = router;