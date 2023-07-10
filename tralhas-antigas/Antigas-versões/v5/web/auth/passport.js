const passport = require('passport'); 
var DiscordStrategy = require('passport-discord').Strategy;
const { set } = require('alter')

passport.use(new DiscordStrategy({
    clientID: set.bot_client,
    clientSecret: set.bot_client_secret,
    callbackURL: set.bot_callback_url,
    scope: scopes
},
function(accessToken, refreshToken, profile, cb) {
    if (set.web_admin_id.includes(profile.id)) {
        return cb(null, profile, { userType: 'admin' });
    } else {
        return cb(null, profile, { userType: 'client' });
    }
}));
