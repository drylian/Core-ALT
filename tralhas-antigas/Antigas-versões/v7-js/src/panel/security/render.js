const ejs = require('ejs');

function ejsRender(template, data, options) {
	return new Promise((resolve, reject) => {
		ejs.renderFile(template, data, options, (err, html) => {
			if (err) {
				reject(err);
			} else {
				resolve(html);
			}
		});
	});
}

module.exports = {
	ejsRender
};
