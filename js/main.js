// NAVIGATION
const elNavToggler = document.querySelector('.js-nav-toggler');
const elNavigation = document.querySelector('.header-navigation__nav');
const elSearchButton = document.querySelector('.js-search-button');
const elSearchModal = document.querySelector('.search-modal');

// BOOK LIST
const elBookList = document.querySelector('.books-hero__list');

// BOOK CARD
const elBookCardTemp = document.querySelector('#book-card-temp').content;

function showBooks() {

  const elBookFragment = document.createDocumentFragment();

  for (const book of books) {
    const elNewBookCard = elBookCardTemp.cloneNode(true);
    elNewBookCard.querySelector('.book-card__img').src = book.imageLink;
    elNewBookCard.querySelector('.book-card__img').alt = book.title;
    elNewBookCard.querySelector('.book-card__book-name').textContent = book.title;
    elNewBookCard.querySelector('.book-card__author-name').textContent = book.author;
    elNewBookCard.querySelector('.book-card__year').textContent = book.year;
    elNewBookCard.querySelector('.book-card__year').datetime = book.year;
    elNewBookCard.querySelector('.book-card__pages').textContent = book.pages;
    elNewBookCard.querySelector('.book-card__language').textContent = book.language;
    elNewBookCard.querySelector('.book-card__wikipedia').href = book.link;
    
    elBookFragment.appendChild(elNewBookCard);
  }

  elBookList.innerHTML = '';

  elBookList.appendChild(elBookFragment);

}

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

showBooks();
