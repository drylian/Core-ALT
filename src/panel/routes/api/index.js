const express = require('express');
const { set } = require('alter');
const router = express.Router();

// Rota principal /api

router.get('/', (req, res) => {
	res.json({ message: `${set.web_name} Appication Api` });
});

module.exports = router;