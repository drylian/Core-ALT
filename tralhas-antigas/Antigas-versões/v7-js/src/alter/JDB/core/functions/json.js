const fs = require('fs');
module.exports = function(local) {
	const json = fs.readFileSync(local, 'utf-8');
	return JSON.parse(json);
};