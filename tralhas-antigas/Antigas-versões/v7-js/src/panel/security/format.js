const { db } = require('alter');

const set = db.get('config');
module.exports = {
	AuthFormat: function (req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		}
		if (set.web_admin_id.split(',').includes(req.user.id)) {
			return res.redirect('/admin');
		} else {
			return res.redirect('/client');
		}
	}
};