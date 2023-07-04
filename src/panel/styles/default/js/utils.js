/**
 * 
 * Scripts para a o sidebar
 * 
 */

/*===== Toggle do Menu Lateral =====*/

const btnMenu = document.getElementById('btn-menu');

btnMenu.addEventListener('click', toggleMenu);

function toggleMenu() {
	const menu = document.getElementById('menu-lateral');
	const menuSuperior = document.getElementById('menu-superior');
	const corpoSite = document.getElementById('corpo-site');

	// Mostra o Menu lateral
	menu.classList.toggle('show');

	// Muda o ícone do botão
	btnMenu.classList.toggle('bx-x');

	// Movimenta o menu Superior
	menuSuperior.classList.toggle('body-pd');

	// Movimenta o corpo do site
	corpoSite.classList.toggle('body-pd');
}


/*===== Adiciona Ativo do momento =====*/
const navLista = document.querySelectorAll('.nav-lista');

function colorLink() {
	if (navLista) {
		navLista.forEach(l => l.classList.remove('ativo'));
		this.classList.add('ativo');
	}
}

navLista.forEach(l => l.addEventListener('click', colorLink));

/**
 * 
 * Scripts para a o nav.css
 * 
 */

window.onload = function () {
	var linkss = document.querySelectorAll('.nav-horizontal-lista');
	var currentHrefa = window.location.href;

	// Adiciona classe 'selected' ao link correspondente ao href atual
	linkss.forEach(function (links) {
		if (links.href === currentHrefa) {
			links.classList.add('selected');
		}
	});

	var links = document.querySelectorAll('.nav-lista');
	var currentHref = window.location.href;

	// Adiciona classe 'selected' ao link correspondente ao href atual
	links.forEach(function (link) {
		if (link.href === currentHref) {
			link.classList.add('ativo');
		}
	});
};
/**
 * 
 * Scripts de erro
 * 
 */
function goBack() {
	window.history.back();
}

// Função icon click para fomularios

function submitForm(form) {
	form.submit();
}

// Função toggleSwitch() para ativar/desativar os switches de forma independente
function toggleSwitch(switchName) {
	var checkbox = document.getElementById(switchName);
	var switchValue = checkbox.checked ? 'on' : 'off';

	// Logica para salvar o valor do switch (on/off)
	console.log('Switch:', switchName, 'Valor:', switchValue);
}