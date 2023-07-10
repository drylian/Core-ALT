module.exports = function (folderPath) {
	const fs = require('fs');
	fs.mkdirSync(folderPath, { recursive: true });
};