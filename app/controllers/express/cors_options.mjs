import configuractions from "../settings/Default.mjs";
import { json } from "../../utils/json.mjs";
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
			callback(new Error("Não Permitido pelo CORS"));
		}
	},
	optionsSuccessStatus: 200
};

export default  cors_options;