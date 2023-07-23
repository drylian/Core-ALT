import cookieParser from "cookie-parser";
import CsrfConfig from "./Csrf-Forms/CsrfConfig.mjs";
import { config } from "../../../controllers/ConfigController.mjs";

// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

async function CsrfController(app) {
  // Essas configurações são apenas para teste de desenvolvimento local.
  // Não os use na produção.
  // Na produção, certifique-se de usar cors e capacete e ter a configuração adequada.
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

  app.post(
    "/protected_endpoint",
    doubleCsrfProtection,
    csrfErrorHandler,
    (req, res) => {
      console.log(req.body);
      res.json({
        protected_endpoint: "form processed successfully",
      });
    }
  );

  // Try with a HTTP client (is not protected from a CSRF attack)
  app.post("/unprotected_endpoint", (req, res) => {
    console.log(req.body);
    res.json({
      unprotected_endpoint: "form processed successfullyss",
    });
  });
}

export {
  CsrfController,
}