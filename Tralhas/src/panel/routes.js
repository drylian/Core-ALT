/**
 * 
 * Alternight 2023 Routes
 * 
 * Sistema de Rotas do painel, Responsavel para carregar todas as rotas sistema,
 * Criado com o intuito de ser simples, a segurança vem das seguintes areas.
 * cada rota inicial /algo/* o "algo" é a rota inicial, caso ele tenha uma verificação
 * ele bloqueará o acesso naturalmente.
 * 
 * /admin , rotas padrão de administrativas, essa rota possue um sistema de verificação de login,
 *  para provar que o usuario possue login e que esteja na lista de administradores.
 * 
 * /api , rota padrão de token, usar /api fará uma verificação se possue o bearer e se ele é valido.
 * 
 * /client, rota padrão dos clientes, essa rota possue um sistema de verificação de login,
 *  para provar que o usuario possue login.
 * 
 */
function routerInit(app) {
	app.use('/', require('./routes/index'));
	app.use('/auth/login', require('./routes/auth/login'));
	/**
	 * Rotas api(com token)
	 */
	app.use('/api', require('./routes/api/index'));
	/**
	 * Rotas admin/settings
	 */
	app.use('/admin', require('./routes/admin/index'));
	app.use('/admin', require('./routes/admin/settings/alert'));
	app.use('/admin', require('./routes/admin/settings/style'));
	app.use('/admin', require('./routes/admin/settings/index'));
	app.use('/admin', require('./routes/admin/settings/config'));
	app.use('/admin', require('./routes/admin/settings/jdbconf'));
	app.use('/admin', require('./routes/admin/settings/upload/style'));
	app.use('/admin', require('./routes/admin/settings/discord/status'));
	/**
	 * Rotas admin/application-api
	 */
	app.use('/admin', require('./routes/admin/application-api/index'));
	app.use('/admin', require('./routes/admin/application-api/create'));
	app.use('/admin', require('./routes/admin/application-api/delete'));
}

module.exports = routerInit;