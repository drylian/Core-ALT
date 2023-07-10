const { create } = require('./create');
const { install } = require('./install');
const { list } = require('./list');
const { restart } = require('./restart');
const { start } = require('./start');
const { stop } = require('./stop');
const { uptime } = require('./uptime');
const { getinfo } = require('./getinfo');

module.exports = { install, list, restart, start, stop, uptime, create, getinfo };