import express from 'express';
import { json } from '../../../utils/json.mjs';
import configuractions from "../../../controllers/settings/Default.mjs"
const router = express.Router();

router.get('/', (req, res) => {
    const config = json(configuractions.configPATH + "/settings.json")
    const responseData = {
        Website: {
            title: config.server.title,
            url: config.server.url,
            port: config.server.port,
            mode: config.mode,
        },
    };

    const acceptHeader = req.headers.accept || '';
    if (acceptHeader.includes('text/html')) {
        res.render("views/JsonViewer", { responseData: responseData });
    } else {
        // Caso contrário, envie o JSON como resposta normalmente
        res.json(responseData);
    }
});

export default router;
