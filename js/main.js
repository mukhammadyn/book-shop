let languages = [];
let countries = [];

// NAVIGATION
const elNavToggler = document.querySelector('.js-nav-toggler');
const elNavigation = document.querySelector('.header-navigation__nav');
const elSearchButton = document.querySelector('.js-search-button');
const elSearchModal = document.querySelector('.search-modal');

// MODAL  
const elSearchModalForm = document.querySelector('.js-search-modal-form');
const elSearchModalFormInputName = elSearchModalForm.querySelector('.js-search-by-name');
const elSearchModalFormStartYear = elSearchModalForm.querySelector('.js-search-by-start-year');
const elSearchModalFormEndYear = elSearchModalForm.querySelector('.js-search-by-end-year');
const elSearchModalFormLanguage = elSearchModalForm.querySelector('.js-search-by-language');
const elSearchModalFormCountry = elSearchModalForm.querySelector('.js-search-by-country');
const elSearchModalFormSort = elSearchModalForm.querySelector('.js-search-by-sort');
const elSearchModalFormSubmit = elSearchModalForm.querySelector('.js-search-modal-btn');


// BOOK LIST
const elNewBooksList = document.querySelector('.site-books__list');
const elBookList = document.querySelector('.books-hero__list');

// BOOK CARD
// const elNewBookCardTemp = document.querySelector('#new-books').content;
const elBookCardTemp = document.querySelector('#book-card-temp').content;

// function showNewBooks() {

//   const newBooks = books.filter(book => {
//     return book.year > 1980;
//   });

//   const 
// }

function getLanguages() {
  
  for (let book of books) {
    if (!languages.includes(book.language)) {
      languages.push(book.language);
    }
  }  
}

function getCountries() {
  
  for (const book of books) {
    if (!countries.includes(book.country)) {
      countries.push(book.country)
    }
  }
}

function appendLanguages() {
  
  let languageFragment = document.createDocumentFragment();
  for (const lan of languages) {
    const elNewOption = document.createElement('option');
    elNewOption.textContent = lan;
    elNewOption.value = lan;
    languageFragment.appendChild(elNewOption);
  }
  elSearchModalFormLanguage.appendChild(languageFragment);
}

function appendCountries() {
  let elOptionFragment = document.createDocumentFragment();
  
  for (const country of countries) {
    const elNewOption = document.createElement('option');
    elNewOption.textContent = country;
    elNewOption.value = country;
    elOptionFragment.appendChild(elNewOption);
  }
  elSearchModalFormCountry.appendChild(elOptionFragment);
  
}

function toggleNavActive() {
  elNavigation.classList.toggle('header-navigation__nav--active');
}

function openSearchModal() {
  elSearchModal.classList.add('search-modal--open');
}

function showBooks(lib) {
  
  const elBookFragment = document.createDocumentFragment();
  
  for (const book of lib) {
    const elNewBookCard = elBookCardTemp.cloneNode(true);
    elNewBookCard.querySelector('.book-card__img').src = book.imageLink;
    elNewBookCard.querySelector('.book-card__img').alt = book.title;
    elNewBookCard.querySelector('.book-card__book-name').textContent = book.title;
    elNewBookCard.querySelector('.book-card__author-name').textContent = book.author;
    elNewBookCard.querySelector('.book-card__year').textContent = book.year;
    elNewBookCard.querySelector('.book-card__year').datetime = book.year;
    elNewBookCard.querySelector('.book-card__pages').textContent = book.pages;
    elNewBookCard.querySelector('.book-card__language').textContent = book.language;
    elNewBookCard.querySelector('.book-card__wikipedia').textContent = 'More info';
    elNewBookCard.querySelector('.book-card__wikipedia').href = book.link;
    
    elBookFragment.appendChild(elNewBookCard);
  }
  
  elBookList.innerHTML = '';
  
  elBookList.appendChild(elBookFragment);
  
}

function filteredBooks(name = '') {
  return books.filter(book => {
    const findedBooks = book.title.match(name) && (elSearchModalFormLanguage.value == book.language || elSearchModalFormLanguage.value == 'all')
    && (elSearchModalFormCountry.value == book.country || elSearchModalFormCountry.value === 'all') && (Number(elSearchModalFormStartYear.value) <= book.year || elSearchModalFormStartYear.value == '') 
    && (Number(elSearchModalFormEndYear.value) >= book.year || elSearchModalFormEndYear.value == '')
    return findedBooks;
  })
  
}

function filterBooks(evt) {
  evt.preventDefault();
  
  let titleRegex = new RegExp(elSearchModalFormInputName.value, 'gi');
  
  let foundBooks = filteredBooks(titleRegex, elSearchModalFormStartYear.value, elSearchModalFormEndYear.value, elSearchModalFormLanguage.value, elSearchModalFormCountry.value);
  
  if (foundBooks.length > 0) {
    showBooks(foundBooks);
  } else {
    elBookList.innerHTML = `<span>Book not found!(</span>`;
  }
  
}

if (elNavToggler) {
  elNavToggler.addEventListener('click', toggleNavActive);
}

if (elSearchButton) {
  elSearchButton.addEventListener('click', openSearchModal);
}

if (elSearchModalFormSubmit) {
  elSearchModalFormSubmit.addEventListener('click', filterBooks);
}

window.onclick = function(evt) {
  if (evt.target == elSearchModal) {
    elSearchModal.classList.remove('search-modal--open');
  }
}


getCountries();
appendCountries();
getLanguages();
appendLanguages();
showBooks(books.slice(0, 50));
