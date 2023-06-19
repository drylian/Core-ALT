const fs = require('fs');
const fdr = require('../system/folder')
const { gen } = require('../system/getToken')

//cria pasta
fdr.create('./set/web/data')
// Gera os tokens
function generateTokens() {
  const session = gen(1024);
  const client = gen(1024);
  const admin = gen(1024);

  const tokens = {
    session,
    client,
    admin
  };

  const jsonTokens = JSON.stringify(tokens);

  fs.writeFileSync('./set/web/data/temp.json', jsonTokens);
}

// Lê os tokens do arquivo e os retorna
function expandTokens() {
  const jsonTokens = fs.readFileSync('./set/web/data/temp.json');
  const tokens = JSON.parse(jsonTokens);

  return tokens;
}

// Exporta as funções
module.exports = {
    generateTokens,
  session: expandTokens().session,
  client: expandTokens().client,
  admin: expandTokens().admin
};
