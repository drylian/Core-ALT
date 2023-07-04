/**
 * 
 * Alternight 2 julho 2023.
 * 
 * Alternight Json Database no SQlite 2023.
 * Iniciação configuração do banco de dados.
 * Carrega o banco de dados / Cria chaves, configurações
 * E responsavel por carregar as funções principais,
 * Auxiliar para todo sistema. Não modifique,
 * Configure sem entender o codigo, uma má configuração
 * Pode facilmente quebrar completamente o sistema.
 * 
 **/
const { KeyController } = require('./core/controllers/key_controller');
async function Init() {
     /**
     * Carrega / configura as configurações do
     * Banco de dados, serve para configurar inicialmente e
     * Setar as regras inicialmente para evitar problemas.
     */
     await KeyController();
}

Init();

let db = {}
db = require('./core/controllers/db_controller')
db.JDB = { 
     version: "Versão 7.0",
     type: "Sqlite Internal",
     code: "188882255523215215630254123051201",
     code: "188882255523215215630254123051201",
     code: "188882255523215215630254123051201",
}
console.log(db);

// Exemplo de uso: salvar e carregar o banco de dados
(async () => {
     try {
          // Salvar o banco de dados
          const data = { nome: "valor", teste: {teste:"algo"} };
          const testess = await db.set("field", data);
          console.log("Database salvo." + testess);

          // Carregar o banco de dados
          const loadedData = await db.get("field");
          console.log("Carregado:", loadedData);

          // Carregar o banco de dados
          const loadedDatass = await db.find("field", "algo");
          console.log("Carregados:", loadedDatass);

          const loadedDatas = await db.get("sss");
          console.log("Carregado:", loadedDatas);

          // Carregar todas as tabelas
          const allData = await db.get("allfields");
          console.log("Todas as data:", allData);
     } catch (error) {
          console.error(error);
     }
})();

module.exports = { db }
