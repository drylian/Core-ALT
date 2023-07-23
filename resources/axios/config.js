import axios from "axios";

/**
 * Configuração basica do axios, serve para carregar configurações "basicas"
 * do axios, facilitando o uso dele, é possivel adicionar outras coisas no
 * "headers" como por exemplo, tokens de usuario e coisas do tipo para dar
 * mais segurança ao seu site.
 */
const http = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type": "application/json"
    }
})

export default http