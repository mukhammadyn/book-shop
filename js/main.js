const elNavToggler = document.querySelector('.js-nav-toggler');
const elNavigation = document.querySelector('.header-navigation__nav');
const elSearchButton = document.querySelector('.js-search-button');
const elSearchModal = document.querySelector('.search-modal');

function toggleNavActive() {
  elNavigation.classList.toggle('header-navigation__nav--active');
}

function openSearchModal() {
  elSearchModal.classList.add('search-modal--open');
}

if (elNavToggler) {
  elNavToggler.addEventListener('click', toggleNavActive);
}

if (elSearchButton) {
  elSearchButton.addEventListener('click', openSearchModal);
}

window.onclick = function(evt) {
  if (evt.target == elSearchModal) {
    elSearchModal.classList.remove('search-modal--open');
  }
}
