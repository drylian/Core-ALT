import { CsrfProtection } from "./middlewares/csrf-csrf.mjs";
import imagemRoute from "./routes/image.mjs";
import ApplicationRoute from "./routes/api/application.mjs";

import authenticateRoute from "./routes/auth/authenticate.mjs";
import LoginRoute from "./routes/auth/login.mjs";
import RegisterRoute from "./routes/auth/register.mjs";
import RefreshRoute from "./routes/auth/refresh.mjs";

export default async function Routers(app) {
	/**
	 * Carrega a proteção CSRF no painel
	 */
	// await CsrfProtection(app);
	/**
	 * Visualizador de imagem
	 */
	app.use("/", imagemRoute);
	app.use("/api/application", ApplicationRoute);
	app.use("/auth/authenticate", authenticateRoute);
	app.use("/auth/login", LoginRoute)
	app.use("/auth/register", RegisterRoute)
	app.use("/auth/refresh", RefreshRoute)




}