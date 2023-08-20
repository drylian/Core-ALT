import configuractions from "../settings/Default.mjs";
import { json } from "../../utils/json.mjs";
import cors from "cors";

async function CorsOptions(app) {

	function corsCheck(req, res, next) {
		const acceptHeader = req.headers.accept || '';
		if (!req.headers["authorization"]) {
			const cors_options = {
				origin: (origin, callback) => {
					let valores = json(configuractions.configPATH + "/settings.json") || [];
					if (valores?.server?.cors) {
						if (!valores.server.cors.allowedroutes) {
							valores.server.cors.allowedroutes = "";
						}
						valores.server.cors.allowedroutes += `,${valores.server.url}:${valores.server.port}`;
					}
					const allowedOrigins = valores?.server?.cors?.allowedroutes.split(",").map(route => route.trim());
					if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
						callback(null, true);
					} else {
						if (acceptHeader.includes('text/html')) {
							res.render("errors/CorsError", {title: valores.server.title});
						} else {
							// Caso contrário, envie o JSON como resposta normalmente
							callback({ message: "Não Permitido pelo CORS"});
						}
					}
				},
				optionsSuccessStatus: 200
			};
			cors(cors_options)(req, res, next);
		} else {
			next()
		}
	}
	app.use(corsCheck)
}
export default CorsOptions