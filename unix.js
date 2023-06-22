/*
 * Alternight 2023 - Todos os direitos reservados.
 * configuração principal para carregar os arquivos do painel
 * Responsavel pelo gerenciamente, executação e todos os tipos de função.
 *
 */

// Ler entrada do usuário a partir do terminal
process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    console.log(`Você digitou: ${input}`);
});

// Exibir mensagem no terminal
console.log('Bem-vindo!');

// Enviar saída para o terminal
process.stdout.write('Digite algo: ');
