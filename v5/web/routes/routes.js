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

function rootRoutes(router) {
    // Rotas sem precisar de login /*
    router.use('/', require('./index'));
    router.use('/auth/login', require('./root/auth/login'));
}

module.exports = { adminRoutes, clientRoutes, apiRoutes, rootRoutes };