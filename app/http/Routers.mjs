import { CsrfProtection } from "./middlewares/csrf-csrf.mjs";
import imagem from "./routes/image.mjs";
import authenticateRoute from "./routes/auth/authenticate.mjs";
import LoginRoute from "./routes/auth/login.mjs";
import RegisterRoute from "./routes/auth/register.mjs";
import RefreshRoute from "./routes/auth/refresh.mjs";

export default async function Routers(app) {
	/**
	 * Carrega a proteção CSRF no painel
	 */
	await CsrfProtection(app);
	/**
	 * Visualizador de imagem
	 */
	app.use("/", imagem);
	app.use("/auth/authenticate", authenticateRoute);
	app.use("/auth/login", LoginRoute)
	app.use("/auth/register", RegisterRoute)
	app.use("/auth/refresh", RefreshRoute)




}