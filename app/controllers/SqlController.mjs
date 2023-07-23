import { QuickDB, MySQLDriver } from 'quick.db';
import { config } from './ConfigController.mjs'

const APP_DATABASE = config.root + '/Core.sqlite';
let db
if (config.db.type === 'Mysql') {
  const mysqlDriver = new MySQLDriver({
    port: config.db.port,
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
  });
  await mysqlDriver.connect(); // connect to the database **this is important**
  db = new QuickDB({ mysqlDriver });
} else {
  db = new QuickDB({ filePath: APP_DATABASE });
}

export { db }