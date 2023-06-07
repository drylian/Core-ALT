document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const passwordInput = document.getElementById('password');
        const password = passwordInput.value;

        // Faz a solicitação AJAX para verificar a senha
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/auth/login?pass=' + encodeURIComponent(password));
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    // Senha válida, redireciona para a página adequada
                    window.location.href = '/admin/index.html'; // Substitua com a página desejada
                } else {
                    // Senha inválida, exibe mensagem de erro
                    alert('Senha incorreta. Por favor, tente novamente.');
                }
            } else {
                // Erro na solicitação AJAX, exibe mensagem de erro
                alert('Erro ao verificar a senha. Por favor, tente novamente.');
            }
        };
        xhr.send();
    });
});

function changeTheme(themeName) {
    if (themeName === 'default') {
        var themeLink = document.getElementById('theme');
        themeLink.href = "";
        localStorage.removeItem('theme'); // Remove o tema do cache local
    } else {
        var themeLink = document.getElementById('theme');
        themeLink.href = '../../Pages/css/themes/' + themeName + '.css';
        localStorage.setItem('theme', themeName); // Armazena o tema selecionado no cache local
    }
}
function loadSelectedTheme() {
    var storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        changeTheme(storedTheme); // Aplica o tema armazenado no cache local
        var themeSelector = document.getElementById('theme-select');
        themeSelector.value = storedTheme; // Atualiza o valor do seletor com o tema armazenado
    }
}

// Chama a função para carregar o tema selecionado ao carregar a página
loadSelectedTheme();


const button = document.querySelector('.button');

const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
