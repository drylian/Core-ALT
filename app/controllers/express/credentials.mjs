import configuractions from "../settings/Default.mjs";
import { json } from "../../utils/json.mjs";
const credentials = (req, res, next) => {
	const origin = req.headers.origin;
	let valores = json(configuractions.configPATH + "/settings.json") || [];
	if (valores?.server?.cors) {
		if (!valores.server.cors.allowedroutes) {
			valores.server.cors.allowedroutes = "";
		}
		valores.server.cors.allowedroutes += `,${valores.server.url}:${valores.server.port}`;
	}
	const allowedOrigins = valores?.server?.cors?.allowedroutes.split(",").map(route => route.trim());
	if (allowedOrigins.includes(origin)) {
		res.header("Access-Control-Allow-Credentials", true);
	}
	next();
};
export default credentials;