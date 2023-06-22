/**
 * Alternight JDB 2023
 * 
 * Função auxiliar gerar valores aleatorios
 * 
 * uso: console.log(gnu(quantidade))
 * 
 */
function gnu(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pass = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        pass += charset.charAt(randomIndex);
    }
    return pass;
}

module.exports = { gnu }