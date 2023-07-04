var DiscordStrategy = require('passport-discord').Strategy;

const { db } = require('alter');
const set = db.get('config');

async function initPass(passport) {
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	var scopes = ['identify', 'email', 'guilds', 'guilds.join'];

	passport.use(new DiscordStrategy({
		clientID: set.bot_client,
		clientSecret: set.bot_client_secret,
		callbackURL: set.bot_callback_url,
		scope: scopes
	},
	function (accessToken, refreshToken, profile, cb) {
		return cb(null, profile);
	})
	);
}

module.exports = initPass;