const config = require('./Config/config.json');
const colors = require('colors');


console.log('[' + ' SETUP '.blue + `] Iniciando verificação da ${colors.yellow('config.json')}`);

function checkConfig(obj, depth = 1, parentKeys = []) {
  for (const key in obj) {
    const value = obj[key];
    const keys = [...parentKeys, key];
    const name = keys.join('.');

    if (typeof value === "object") {
      if (depth < 5) {
        checkConfig(value, depth + 1, keys);
      } else {
        console.log('[' + ' FAIL '.red + ']' + ` ${colors.yellow(name)} tem profundidade máxima de 5 subextensões.`);
      }
    } else if (typeof value === "string" || typeof value === "boolean") {
      console.log('[' + ' OK '.green + ']' + ` ${colors.yellow('config.' + name)}`);
    } else {
      console.log('[' + ' FAIL '.red + ']' + ` ${colors.yellow(name)} Não está configurada, configure tudo antes de iniciar o bot!`);
      process.exit(1);
    }
  }
}

checkConfig(config);

console.log('[' + ' SETUP '.blue + '] Todas as informações do config.json estão preenchidas!');
console.log('[' + ' SETUP '.blue + '] Iniciando configurações do bot...');

require('./bot.js');
