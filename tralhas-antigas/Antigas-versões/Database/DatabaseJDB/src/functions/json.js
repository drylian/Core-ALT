const fs = require('fs');
module.exports = function(local) {
	const json = fs.readFileSync(local);
	return JSON.parse(json);
};
