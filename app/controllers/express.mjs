import path from "path";
import express from "express";
import flash from "connect-flash";
import cors from "cors";

import { fileURLToPath } from "url";
import session from "express-session";
import ViteExpress from "vite-express";
import { controller } from "./loggings.mjs";
import fileUpload from "express-fileupload";
import configuractions from "./settings/Default.mjs";
import Routers from "../http/Routers.mjs";
import { json } from "../utils/json.mjs";
import credentials from "./express/credentials.mjs";
import cors_options from "./express/cors_options.mjs";

const core = (level, message) => controller[level]("Express", message, "gray");

export const webpanel = async () => {
	try {
		// Configuração para liberar __dirname no import
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		const config = json(configuractions.configPATH + "/settings.json");
		const buildPath = path.join(__dirname, "../http/public");

		core("log", "Iniciando conexões do painel.");
		const app = express();

		// Manipular opções de verificação de credenciais - antes do CORS!
		// e buscar requisitos de credenciais de cookies
		app.use(credentials);

		// Cross Origin Resource Sharing
		app.use(cors(cors_options));

		// Carrega o ejs , para fins de depuração.
		app.set("view engine", "ejs");
		app.set("views", path.join("./app/http/pages"));

		// Configurações do express e middlewares
		app.use(express.json()); // Equivalente ao bodyParser.json()
		app.use(express.urlencoded({ extended: true })); // Equivalente ao bodyParser.urlencoded({ extended: true })

		// Configuração do express-fileupload
		app.use(fileUpload());

		// Configuração da sessão e flash
		app.use(session({
			secret: config.server.session,
			resave: true,
			saveUninitialized: true
		}));

		app.use(flash());

		let callCount = 0;

		app.use('/', (req, res, next) => {
			if (req.originalUrl === '/robots.txt') {
				next();
				return;
			}
			if (req.originalUrl === '/favicon.ico') {
				next();
				return;
			}

			console.log(`Call to ${req.originalUrl} (${callCount++})`);
			next();
		});

		// Carrega as rotas do sistema
		await Routers(app);

		if (config.mode !== "production") {
			core("log", "Aplicação em modo de desenvolvimento, iniciando...");

			const server = app.listen(config.server.port, "0.0.0.0", () =>
				core("log", `Servidor iniciado em ${config.server.url}:${config.server.port}.`)
			);

			await ViteExpress.bind(app, server);
			core("log", "Vite iniciado com sucesso.");
			await ExtendExpress(app, config);

			// Eventos de erros vindos do express
			server.on("error", (error) => {
				core("err", `Erro não tratado no servidor: ${error.stack}`);
			});
		} else {
			core("log", "Servidor esta inciando...");

			await ExtendExpress(app, config);

			app.use('/', express.static(path.join(buildPath)));

			const server = app.listen(config.server.port, "0.0.0.0", () =>
				core("log", `Servidor iniciado em ${config.server.url}:${config.server.port}.`)
			);

			// Eventos de erros vindos do express
			server.on("error", (error) => {
				core("err", `Erro não tratado no servidor: ${error.stack}`);
			});

		}
	} catch (err) {
		core("err", "Erro ao tentar carregar conexões do painel: " + err.stack);
	}
};

async function ExtendExpress(app, config) {

	app.all("*", (req, res) => {
		res.status(404);
		if (req.accepts("html")) {
			res.render("errors/404", { title: config.server.title });
		} else if (req.accepts("json")) {
			res.json({ "error": "404 - Não encontrado" });
		} else {
			res.type("txt").send("404 - Não encontrado");
		}
	});

	app.all(function (error, req, res) {
		core("err", "Erro : " + error.stack);
		res.status(500);
		if (req.accepts("html")) {
			res.render("errors/500", { title: config.server.title });
		} else if (req.accepts("json")) {
			res.json({ "error": "500 - Erro interno" });
		} else {
			res.type("txt").send("500 - Erro interno");
		}
	});
}