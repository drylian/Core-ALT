import cookieParser from "cookie-parser";
import CsrfConfig from "./Csrf-Forms/CsrfConfig.mjs";
import { config } from "../../../controllers/ConfigController.mjs";

async function CsrfController(app) {
  const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } = await CsrfConfig(config.csrf)

  /**
   * Cookie de segurança.
   */
  app.use(cookieParser(config.csrf.cookie_secret));

  // Error handling, validation error interception
  const csrfErrorHandler = (error, req, res, next) => {
    if (error == invalidCsrfTokenError) {
      req.flash('error', "erro de validação Csrf");
      next();
    } else {
      next();
    }
  };

  app.get("/csrf-token", (req, res) => {
    return res.json({
      token: generateToken(res, req),
      cookie: config.csrf.cookie_name,
    });
  });

  function AuthController(req, res, next) {
    // Verifica se a chave de autorização está presente no cabeçalho da requisição
    const authorizationKey = req.headers['authorization'];
  
    if (authorizationKey === 'sua_chave_de_autorizacao') {
      // Se a chave de autorização estiver correta, você pode permitir que o código continue
      console.log('Uso de token detectado! O código continuará sem proteção CSRF.');
      next();
    } else {
      // Caso contrário, continue com a proteção CSRF normal
      doubleCsrfProtection(req, res, () => {
        csrfErrorHandler(null, req, res, next);
      });
    }
  }
  
  app.use(AuthController);
}

export {
  CsrfController,
}