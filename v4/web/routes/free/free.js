function freeRoutes(app) {
try {
  // Rotas Livres /*
  app.use('/', require('./index.js'));
  
  app.use('/eco-system', require('./routes/teste.js')); 
  
} catch (err) {
  console.log(`[ Web - Free ] Erro de Rota: ${err}`);
}
}
module.exports = { freeRoutes };