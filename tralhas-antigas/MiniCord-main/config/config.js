const config = {};

config.port = process.env.PORT || 5000;
config.dbURL = process.env.DATABASEURL || "mongodb://172.93.111.163:11014"; // Add Database URI | Mongoose

module.exports = config;
