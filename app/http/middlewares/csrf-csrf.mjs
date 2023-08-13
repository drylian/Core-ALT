import cookieParser from "cookie-parser";
import CsrfConfig from "./csrf-csrf/config.mjs";
import configuractions from "../../controllers/settings/Default.mjs";
import { json } from "../../utils/json.mjs";
import { controller } from "../../controllers/loggings.mjs";
const core = (level, message) => controller[level]("Segurança", message, "gray");

async function CsrfProtection(app) {
	const config = json(configuractions.configPATH + "/settings.json");

	const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } = await CsrfConfig(config.server.csrf);

	/**
     * Cookie de segurança.
     */
	app.use(cookieParser(config.server.csrf.cookie_secret));

	// Error handling, validation error interception
	const csrfErrorHandler = (error, req, res, next) => {
		if (error == invalidCsrfTokenError) {
			req.flash("error", "erro de validação Csrf");
			next();
		} else {
			next();
		}
	};

	app.get("/csrf-token", (req, res) => {
		return res.json({
			token: generateToken(res, req),
			cookie: config.server.csrf.cookie_name,
		});
	});

	function ConnectionsCheck(req, res, next) {
		const config = json(configuractions.configPATH + "/settings.json");
		// Verifica se a chave de autorização está presente no cabeçalho da requisição
		const authorizationKey = req.headers["authorization"];

		if (authorizationKey === "sua_chave_de_autorizacao") {
			/**
             * Futuro sistema de tokens
             */
			// Se a chave de autorização estiver correta, você pode permitir que o código continue
			core("warn", "Uso de token detectado! O código continuará sem proteção CSRF.");
			next();
		} else {
			/**
             * Verifica se esta na lista de ignorados
             */
			if (config.server.csrf.ignoreroutes) {
				const ignoreRoutesArray = config.server.csrf.ignoreroutes.split(",").map(route => route.trim());
				if (ignoreRoutesArray.includes(req.path)) {
					// Se a rota estiver na lista de ignorados, permitir o acesso sem proteção CSRF
					core("warn", "Uso de rota ignorada para proteção CSRF :" + req.path);
					next();
				} else {
					// Caso contrário, continue com a proteção CSRF normal
					doubleCsrfProtection(req, res, () => {
						csrfErrorHandler(null, req, res, next);
					});
				}
			} else {
				// Se não houver rotas para ignorar definidas, aplicar a proteção CSRF normalmente
				doubleCsrfProtection(req, res, () => {
					csrfErrorHandler(null, req, res, next);
				});
			}
		}
	}
	app.use(ConnectionsCheck);
}

export {
	CsrfProtection,
};