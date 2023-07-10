const { slash, event, debug, expresss } = require('./codes/Logger');
const { client } = require('./codes/Client');
const { cores } = require('./codes/Colors');
const { createCustomTable } = require('./codes/Table');
const config = require('./config/config.json')
const settings = require('./config/settings.json')
const theme = require('./config/theme.json')
const version = require('./config/version.json')

module.exports = {
    config,
    settings,
    theme,
    version,
    slash,
    event,
    expresss,
    debug,
    cores,
    client,
    createCustomTable,
}
