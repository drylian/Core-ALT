import { log } from '../../controllers/LogsController.mjs'

async function init() {
    // Configura as pastas do sistema antes da iniciação.
    await import('../../controllers/ConfigController.mjs')
    log('Configurações iniciais finalizadas, iniciando banco de dados...')

    // Configura banco de dados inicial do painel
    await import('../../controllers/SqlController.mjs')
    log('Banco de dados iniciado')

    // Inicia o express do painel
    await import('../../controllers/ExpressController.mjs')
    log('Express Iniciado com Sucesso.')
}

await init()