const express = require('express');
const router = express.Router();
const { client, config, version } = require('alter');
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const number = require('easy-number-formatter');
const request = require('request');
const jsonfile = require('jsonfile');
const ver = version

const themes = "./alter/config/theme.json";

router.get('/', ensureAuthenticated, (req, res) => {
  res.redirect('/home');
});

router.get('/home', ensureAuthenticated, (req, res) => {
  var theme = jsonfile.readFileSync(themes);
  var options = {
    // method: 'GET',
    // url: `https://raw.githubusercontent.com/LachlanDev/Discord-BOT-Dashboard-V2/main/src/config/version.json`,
    // headers: {
    //   'User-Agent': 'Discord-Bot-Dashboard',
    //   useQueryString: true
    // }
  };

  // Parse update request data to JSON.
  request(options, function (error, response, body) {
    // try {
    //   jsonprased = JSON.parse(body);
    //   verL = jsonprased.ver;
    // } catch (e) {
    //   console.log(chalk.red("Failed to check for updates you may continue using this version, please try again or contact LachlanDev#8014"));
    //   ;
    // }
    verL = ver.ver

    const joinedDate = client.user.createdAt.toDateString();

    res.render('home/home', {
      profile: req.user,
      client: client,
      joinedDate: joinedDate,
      prefix: config.prefix,
      number: number,
      Latestversion: verL,
      Currentversion: ver.ver,
      theme: theme
    });
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged out');
  res.redirect('/login');
});

module.exports = router;
