const { expresss } = require('alter');
const bodyParser = require("body-parser");
// Importe todas as rotas de /api/
const BackEndRoutes = (app) => {
    const ExempleRoute = require("./api/exemplo");
    const PaymentRoute = require("./api/payment");
    const LoginRoute = require("./api/auth/login");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Rotas do BackEnd /api/
    app.use("/api/", ExempleRoute);
    app.use("/api/", PaymentRoute);
    app.use("/api/", LoginRoute);
    ////////////////////////////

    // Middleware de tratamento de erros
    app.use("/api/", (err, req, res, next) => {
        console.error(` [ BackEnd ] Erro: ${err}`);
        res.status(500).json({ message: "Erro interno do servidor" });
    });
}
module.exports = BackEndRoutes;
