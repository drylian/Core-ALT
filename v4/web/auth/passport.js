const passport = require('passport');
var DiscordStrategy = require('passport-discord').Strategy;
const { set } = require('alter')

module.exports = function(passport) {
    var scopes = ['identify', 'email', 'guilds', 'guilds.join'];
 
    passport.use(new DiscordStrategy({
        clientID: set.bot_client,
        clientSecret: set.bot_client_secret,
        callbackURL: set.bot_callback_url,
        scope: scopes
    },
    function(accessToken, refreshToken, profile, cb) {
        if(set.web_admin_id.includes(profile.id)){
            return cb(null, profile);
        }else{
            return cb(null, false, { message: 'Não autorizado! ID do cliente não está na lista!' })
        }
    }));

    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });
}
