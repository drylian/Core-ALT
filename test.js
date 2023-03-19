const config = require('./config.json');

console.log("[ VERIFICADOR ] Iniciando verificação da config.json");

function checkConfig(obj, depth = 1, parentKeys = []) {
  for (const key in obj) {
    const value = obj[key];
    const keys = [...parentKeys, key];
    const name = keys.join('.');

    if (typeof value === "object") {
      if (depth < 5) {
        checkConfig(value, depth + 1, keys);
      } else {
        console.log(`[ VERIFICADOR ] "${name}" tem profundidade máxima de 5 subextensões.`);
      }
    } else if (typeof value === "string" && value !== "") {
      console.log(`[ VERIFICADOR ] "${name}" foi configurada com sucesso.`);
    } else {
      console.log(
        `[ VERIFICADOR ] "${name}" não foi configurada no config.json. Iniciar novamente quando estiver tudo configurado.`
      );
      process.exit(1);
    }
  }
}

checkConfig(config);
