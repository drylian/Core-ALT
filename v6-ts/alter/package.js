const db = require('./modules/db/JDB')
const { gen, gex } = require('./utils/gtokens');
const temp = require('./modules/web/ttokens');

module.exports = {
  gen,gex,db,temp,
};
