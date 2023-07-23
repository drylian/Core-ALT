const express = require('express');
const router = express.Router();
const { db } = require('alter');

// Rota para deletar um token pelo ID
router.post('/application-api/delete', (req, res) => {
	const { id } = req.body;

	if (db.del('tokens', id)) {
		req.flash('success', `O id "${id}" foi removido com sucesso.`);
		res.redirect('/admin/application-api');
	} else {
		req.flash('error', `O id "${id}" não foi encontrado.`);
		res.redirect('/admin/application-api');
	}
});

module.exports = router;