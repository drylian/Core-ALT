function changeTheme(themeName) {
    if (themeName === 'default') {
        var themeLink = document.getElementById('theme');
        themeLink.href = "";
        localStorage.removeItem('theme'); // Remove o tema do cache local
    } else {
        var themeLink = document.getElementById('theme');
        themeLink.href = './css/themes/' + themeName + '.css';
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


// Obter o valor do preço da URL
var urlParams = new URLSearchParams(window.location.search);
var price = urlParams.get('price');

if (!price) {
    window.location.href = "/";
}

// Definir o valor do preço no campo de entrada
document.getElementById('price').value = price;

// Manipular o envio do formulário
document.getElementById('paymentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value;

    fetch('/api/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, price: price })
    })
        .then(function (response) {
            if (response.ok) {
                return response.text(); // Obter a resposta como texto
            } else {
                throw new Error('Erro na solicitação de pagamento: ' + response.status);
            }
        })
        .then(function (data) {
            if (data.startsWith('http')) {
                window.location.href = data; // Redirecionar para o link
            } else {
                // Atualizar o conteúdo do elemento "response" com o texto da resposta
                document.getElementById('response').innerText = data;
            }
        })
        .catch(function (error) {
            console.error('Erro na solicitação de pagamento:', error);
        });
});

