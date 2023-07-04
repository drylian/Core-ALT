const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/settings/upload/style', function (req, res) {
	let styleFile;
	let uploadPath;

	if (!req.files || Object.keys(req.files).length === 0) {
		return req.flash('error', 'Nenhum arquivo foi carregado, tente novamente!'),
		res.redirect('/admin/settings');
	}
	
	if (!req.files.styleFile.name.endsWith('.css')) {
		return req.flash('error', 'Por favor, carregue apenas arquivos CSS!'),
		res.redirect('/admin/settings');
	}

	const path = './src/panel/styles/' + req.files.styleFile.name;
	if (fs.existsSync(path)) {
		return req.flash('error', 'Tema com esse nome já existe!'),
		res.redirect('/admin/settings');
	}

	styleFile = req.files.styleFile;
	uploadPath = './src/panel/styles/' + styleFile.name;

	styleFile.mv(uploadPath, function (err) {
		if (err)
			return res.status(500).send(err);

		req.flash('success', `Estilo ${styleFile.name} carregado com sucesso!`);
		res.redirect('/admin/settings');
	});
});


module.exports = router;