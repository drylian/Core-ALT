const db = require('./modules/db/JDB')
const { gen, gex } = require('./utils/gtokens');
const temp = require('./modules/express/ttokens');
const { client } = require('./modules/discord/client')
const { ctable } = require('./modules/discord/table');
const { slash, event, debug, expresss } = require('./modules/discord/logger');
const { cores } = require('./modules/discord/cores')

module.exports = {
  gen,gex,db,temp,
  slash,
  event,
  expresss,
  debug,
  cores,
  client,
  ctable,
};
