function changeTheme(themeName) {
  if (themeName === 'default') {
    var themeLink = document.getElementById('theme');
    themeLink.href = "";
    localStorage.removeItem('theme'); // Remove o tema do cache local
  } else {
    var themeLink = document.getElementById('theme');
    themeLink.href = './client/css/themes/' + themeName + '.css';
    localStorage.setItem('theme', themeName); // Armazena o tema selecionado no cache local
  }
}

function makePayment(price) {
  // Redirecionar o usuário para a página de pagamento com os parâmetros na URL
  window.location.href = "/client/Payment.html?price=" + price;
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