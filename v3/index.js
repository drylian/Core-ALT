const express = require('express')
const discord = require('./src/bot')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const { config }= require('alter')

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

port = config.port;

app.use(express.static('./web/public'));
app.use(express.static('./web/themes'));
app.set('views', './web/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true,limit: '5mb' }));
app.use(fileUpload());

require('./web/auth/passport')(passport);


// Express session
app.use(
    session({
      secret: '4135231b7f33c66406cdb2a78420fa76',
      resave: true,
      saveUninitialized: true
    })
);
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', require('./web/routes/home.js'));
app.use('/', require('./web/routes/settings.js'));
app.use('/', require('./web/routes/guilds.js'));
app.use('/', require('./web/routes/support.js'));
app.use('/', require('./web/routes/plugins.js'));

app.use('/login', require('./web/routes/login.js'));

http.listen(port)

io.sockets.on('connection', function(sockets){
  setInterval(function(){ 
    // Uptime Count
    let days = Math.floor(discord.client.uptime / 86400000);
    let hours = Math.floor(discord.client.uptime / 3600000) % 24;
    let minutes = Math.floor(discord.client.uptime / 60000) % 60;
    let seconds = Math.floor(discord.client.uptime / 1000) % 60;
  
    var BOTuptime = `${days}d ${hours}h ${minutes}m ${seconds}s` 
    
    // Emit count to browser 
    sockets.emit('uptime',{uptime:BOTuptime}); }, 1000);
})

// Error Pages
app.use(function(req,res){
  res.status(404).render('error_pages/404');
});
