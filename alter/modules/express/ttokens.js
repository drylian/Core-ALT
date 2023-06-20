const fs = require('fs');
const fdr = require('../../utils/folder')
const { gen } = require('../../utils/gtokens')

//cria pasta
fdr.create('./alter/modules/express/data/')
const ttokensPath = './alter/modules/express/data/ttokens.json'

if(!fs.existsSync(ttokensPath)){
  initTokens()
}

// Gera os tokens
function initTokens() {
  const session = gen(1024);
  const client = gen(1024);
  const admin = gen(1024);
  const setup = gen(64);

  const tokens = {
    session,
    client,
    admin,
    setup
  };

  const jsonTokens = JSON.stringify(tokens);

  fs.writeFileSync(ttokensPath, jsonTokens);
}

// Lê os tokens do arquivo e os retorna
function tokenlist() {
  const jsonTokens = fs.readFileSync(ttokensPath);
  const tokens = JSON.parse(jsonTokens);

  return tokens;
}

// Exporta as funções
module.exports = {
    initTokens,
  session: tokenlist().session,
  client: tokenlist().client,
  admin: tokenlist().admin,
  setup: tokenlist().setup
};
