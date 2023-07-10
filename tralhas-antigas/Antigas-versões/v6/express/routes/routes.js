function adminRoutes(router) {
    // Rotas Admin /admin/*
    router.use('/admin', require('./admin/index'));
    router.use('/admin', require('./admin/settings'));
}

function clientRoutes(router) {
    // Rotas Cliente /client/*
    // router.use('/client', require('./index'));
    // router.use('/client', require('./routes/settings'));
}

function apiRoutes(router) {
    // Rotas API /api/*
    router.use('/api', require('./index'));
}

function setupRoutes(router) {
    // Rotas de configuração inicial /setup*
    router.use('/', require('./setup/setup'));
}

function rootRoutes(router) {
    // Rotas sem precisar de login /*
    router.use('/', require('./root/index'));
    router.use('/auth/login', require('./root/auth/login'));
}



module.exports = { adminRoutes, clientRoutes, apiRoutes, rootRoutes, setupRoutes };