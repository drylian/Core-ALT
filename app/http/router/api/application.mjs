import express from 'express';
import { config } from '../../../controllers/ConfigController.mjs';
import html from '../pages/JsonViewer.mjs'
const router = express.Router();

router.get('/application', (req, res) => {
     const responseData = {
        Website: config 
    }

    const acceptHeader = req.headers.accept || '';
    if (acceptHeader.includes('text/html')) {
        res.send(html(responseData));
    } else {
        // Caso contrário, envie o JSON como resposta normalmente
        res.json(responseData);
    }
});

export default router;
