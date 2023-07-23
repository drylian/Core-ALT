import { envSV } from "../../modules/env.mjs";
import { gen } from "../../modules/gerate.mjs";
function keyGen(key, extend) {
    const valor = extend || 'key_'
    if (!process.env[key]) {
        // Gere uma nova chave
        const new_core_key = gen(64);

        // Atualize a variável de ambiente CORE_KEY no objeto process.env
        process.env[key] = valor + `${new_core_key}`;

        // Salva a o env com a chave nova
        envSV(key, valor + `${new_core_key}`)
    }
    return process.env[key]
}
export { keyGen }