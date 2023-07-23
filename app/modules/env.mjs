import fs from 'fs';
import dotenv from 'dotenv';
const env_local = '.env'

function envLD(envKey) {
    // Lê o conteúdo do arquivo .env
    const envData = fs.readFileSync(env_local, 'utf8');
    // transforma em process.env
    const env = dotenv.parse(envData);
    //coleta o process.env expecifico
    for (const key in env) {
        process.env[key] = env[key];
    }
    return process.env[envKey]
}

function envSV(envKey, envValue) {  
    // Lê o conteúdo do arquivo .env
    const envData = fs.readFileSync(env_local, 'utf8');
  
    // Divide o conteúdo em linhas
    const lines = envData.split('\n');
  
    // Atualiza a variável de ambiente especificada
    const updatedLine = `${envKey}=${envValue}`;
    let foundKey = false;
  
    const updatedLines = lines.map(line => {
      // Verifica se a linha corresponde à variável de ambiente
      if (line.startsWith(envKey + '=')) {
        foundKey = true;
        return updatedLine;
      }
      return line;
    });
  
    // Se a variável de ambiente não foi encontrada, adiciona uma nova linha
    if (!foundKey) {
      updatedLines.push(updatedLine);
    }
  
    // Junta as linhas atualizadas, preservando as linhas de comentário
    const updatedContent = updatedLines.join('\n');
  
    // Salva o conteúdo atualizado no arquivo .env
    fs.writeFileSync(env_local, updatedContent);
  
    // Atualiza as variáveis de ambiente no processo atual
    dotenv.config();
  }

export { envLD, envSV }