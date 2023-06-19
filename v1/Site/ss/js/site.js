function changeTheme(themeName) {
    var themeLink = document.getElementById('theme');
    themeLink.href = 'css/' + themeName + '.css';
    localStorage.setItem('theme', themeName); // Armazena o tema selecionado no cache local
}

// Verifica se há um tema armazenado no cache local
var storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    changeTheme(storedTheme); // Aplica o tema armazenado no cache local
}
document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.querySelector('.sidebar');
    var toggleButton = document.querySelector('.toggle-button');
    var toggleMobileButton = document.querySelector('.toggle-button-mobile');
    
    toggleButton.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      sidebar.classList.toggle('close');
    });
    toggleMobileButton.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('close');
      });
  });