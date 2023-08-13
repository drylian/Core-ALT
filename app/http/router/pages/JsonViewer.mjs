import { envLD } from '../../../modules/env.mjs';

// Função para formatar o JSON e adicionar cores
function syntaxHighlight(json) {
    envLD()
    json = JSON.stringify(json, null, 4);
    return json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\d+(\.\d+)?)/g, match => {
            let cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
}
const html = (responseData) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${process.env.APP_ICON}" rel="icon" />
        <title>JSON Viewer</title>
        <style>
        /* Adicione o fundo para o conteúdo do JSON dentro do <pre> */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #222; /* Set the background color for the entire page */
        }

        /* Modern dark theme styles for the JSON viewer */
        .json-container {
            margin: 20px auto;
            max-width: 800px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #333; /* Dark gray background for the JSON container */
        }

        .json-container .header {
            border-radius: 10px 10px 0 0;
            background-color: #444; /* Slightly lighter gray for the header background */
            color: #fff;
            padding: 20px;
            display: flex;
            align-items: center;
        }

        .json-container .header .app-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .json-container .header .app-title {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        }

        .json-container .content {
            background-color: #2a2a2a; /* Darker background color for the JSON content */
            padding: 20px;
        }

        pre {
            font-weight: bold;
            color: #fff;
            background-color: #2a2a2a; /* Darker background for the JSON code block */
            padding: 10px;
            border-radius: 5px;
            overflow: auto;
        }

        
            .string {
                font-weight: bold;
                color: #2a00ff;
            }
            .number {
                font-weight: bold;
                color: #ff6600;
            }
            .boolean {
                font-weight: bold;
                color: #00aa22;
            }
            .null {
                font-weight: bold;
                color: #ff0000;
            }
            .key {
                font-weight: bold;
                color: #81f3da;
            }
            .bracket {
                font-weight: bold;
                color: #000;
            }

            /* Estilos para o container do JSON */
            .json-container {
                overflow: hidden;
                margin-top: 10px;
                background-color: #F5F5F5;
                /* Cor clara do box */
                border-top: 4px solid rgb(38, 0, 255);
                /* Linha verde no teto */
                border-radius: 10px;
            }

            .json-container .header {
                border-radius: 7px 7px 0px 0px;
                background-color: #333;
                color: white;
                padding: 10px;
                place-items: center;
                display: flex;
                align-items: center; /* Alinhar os elementos verticalmente */
            }
        
            .json-container .header .app-title {
                font-size: 24px;
                font-weight: bold;
                margin: 0; /* Remova a margem superior para alinhar verticalmente com a imagem */
            }
        
            .json-container .header .app-image {
                width: 50px; /* Ajuste o tamanho da imagem conforme necessário */
                margin-right: 10px; /* Espaçamento entre a imagem e o título */
            }

            .json-container .header h2 {
                margin: 0;
                font-size: 24px;
            }

            .json-container .header p {
                margin: 0;
                font-size: 16px;
                margin-left: 10px;
            }

            .json-container .content {
                overflow: auto;
                border-radius: 0px 0px 7px 7px;
                background-color: #161616;
                padding: 10px;
            }

            /* Estilos para o header do container do JSON */
            .json-header {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 18px;
                font-weight: bold;
                border-bottom: 2px solid #000;
                padding-bottom: 5px;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="json-container">
            <div class="header">
                <img class="app-image" src="${process.env.APP_ICON}" alt="Logo da Aplicação">
                <span class="app-title">${process.env.APP_TITLE} - Conteúdo da API</span>
            </div>
            <div class="content">
                <pre>${syntaxHighlight(responseData)}</pre>
            </div>
        </div>
    </body>
    </html>
`;

export default html;


