const { delay } = require('./modules/system/delay');
const folder = require('./modules/system/folder');
const { db } = require('./JDB/init');
const { gen, gex, gec } = require('./modules/system/gen');
const { json, jsonsv } = require('./modules/system/json');
module.exports = { db, delay, json, jsonsv, folder, gen, gex, gec };