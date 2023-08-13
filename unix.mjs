import Settings from "./app/controllers/settings.mjs";
import core from "./app/controllers/loggings.mjs";

core.sys("Iniciando processos do painel.")

async function init() {
    const { db } = await import("./app/controllers/sequelize.mjs")
    await db.init();

    await import('./app/backend.mjs')

    const { webpanel } = await import('./app/controllers/express.mjs')

    await webpanel()
    // core.log('Teste')
    // core.debug('teste')
    // core.err('teste')
    // core.warn('teste')
    core.sys("Sistema iniciado com sucesso.")
}
console.log()
await Settings()
    .then(async () => {
        // Ok , settings esta configurado
        await init()
    })
    .catch((erro) => {
        core.sys("Erro ao tentar configurar o painel: " + erro.stack)
    });