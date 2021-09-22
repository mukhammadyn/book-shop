const elNavToggler = document.querySelector('.js-nav-toggler');
const elNavigation = document.querySelector('.header-navigation__nav');

function toggleNavActive() {
  elNavigation.classList.toggle('header-navigation__nav--active');
}

if (elNavToggler) {
  elNavToggler.addEventListener('click', toggleNavActive);
}
