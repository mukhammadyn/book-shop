let languages = [];
let countries = [];
let newBooksList = [];

// NAVIGATION
const elNavToggler = document.querySelector('.js-nav-toggler');
const elNavigation = document.querySelector('.header-navigation__nav');
const elSearchButton = document.querySelector('.js-search-button');
const elSearchModal = document.querySelector('.search-modal'); 

if (document.location.href.includes('/books.html')) {
  const elSearchModalForm = document.querySelector('.js-search-modal-form');
  const elSearchModalFormInputName = elSearchModalForm.querySelector('.js-search-by-name');
  const elSearchModalFormStartYear = elSearchModalForm.querySelector('.js-search-by-start-year');
  const elSearchModalFormEndYear = elSearchModalForm.querySelector('.js-search-by-end-year');
  const elSearchModalFormLanguage = elSearchModalForm.querySelector('.js-search-by-language');
  const elSearchModalFormCountry = elSearchModalForm.querySelector('.js-search-by-country');
  const elSearchModalFormSort = elSearchModalForm.querySelector('.js-search-by-sort');
  const elSearchModalFormSubmit = elSearchModalForm.querySelector('.js-search-modal-btn');

// BOOK LIST
  const elBookList = document.querySelector('.books-hero__list');

// BOOK CARD
  const elBookCardTemp = document.querySelector('#book-card-temp').content;

  // GET LANGUAGES
  function getLanguages() {
    
    for (let book of books) {
      if (!languages.includes(book.language)) {
        languages.push(book.language);
      }
    }  
  }

  // GET COUTRIES
  function getCountries() {
    
    for (const book of books) {
      if (!countries.includes(book.country)) {
        countries.push(book.country)
      }
    }
  }

  // ADD LANGUAGES
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

  // ADD COUNTIRES
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

  // SEARCH MODAL
  function openSearchModal() {
    elSearchModal.classList.add('search-modal--open');
  }

  // SHOW BOOKS
  function showBooks(lib, titleRegex = '') {
    
    const elBookFragment = document.createDocumentFragment();
    
    for (const book of lib) {
      const elNewBookCard = elBookCardTemp.cloneNode(true);
      elNewBookCard.querySelector('.book-card__img').src = book.imageLink;
      elNewBookCard.querySelector('.book-card__img').alt = book.title;
      if (titleRegex.source !== '(?:)' && titleRegex) {
        console.log('asdkjasj');
        elNewBookCard.querySelector('.book-card__book-name').innerHTML = book.title.replace(titleRegex, `<i style = 'background-color: #fff; color: #000;'>${titleRegex.source}</i>`);
      } else {
        elNewBookCard.querySelector('.book-card__book-name').textContent = book.title;
      }
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

  // FILTERED BOOKS
  function filterBooks(name = '') {
    return books.filter(book => {
      const findedBooks = book.title.match(name) && (elSearchModalFormLanguage.value == book.language || elSearchModalFormLanguage.value == 'all')
      && (elSearchModalFormCountry.value == book.country || elSearchModalFormCountry.value === 'all') && (Number(elSearchModalFormStartYear.value) <= book.year || elSearchModalFormStartYear.value == '') 
      && (Number(elSearchModalFormEndYear.value) >= book.year || elSearchModalFormEndYear.value == '')
      return findedBooks;
    })
    
  }

  // FILTER BOOKS
  function onBookSearchSubmit(evt) {
    evt.preventDefault();
    let titleRegex = new RegExp(elSearchModalFormInputName.value, 'gi');
    let foundBooks = filterBooks(titleRegex, elSearchModalFormStartYear.value, elSearchModalFormEndYear.value, elSearchModalFormLanguage.value, elSearchModalFormCountry.value);

    sortBooks(foundBooks, elSearchModalFormSort.value);

    if (foundBooks.length > 0) {
      showBooks(foundBooks,titleRegex);
    } else {
      elBookList.innerHTML = `<span>Book not found!(</span>`;
    }
    
  }

  // SORT BOOKS
  function sortBooks(arr,type) {
    if (type == 'az') {
      arr.sort((a,b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });
    } else if (type == 'za') {
      arr.sort((a,b) => {
        if (a.title < b.title) return 1;
        if (a.title > b.title) return -1;
        return 0;
      });
    } else if (type == 'year_asc') {
        arr.sort((a,b) => a.year - b.year);
    } else if (type == 'year_desc') {
        arr.sort((a,b) => b.year - a.year);
    } else if (type == 'page_high-low') {
        arr.sort((a,b) => b.pages - a.pages);
    } else if (type == 'page_low-high') {
        arr.sort((a,b) => a.pages - b.pages);
    }
  }

  if (elSearchModal) {
    const elSearchModalFormSubmit = elSearchModal.querySelector('.js-search-modal-btn');
    elSearchModalFormSubmit.addEventListener('click', onBookSearchSubmit);
  }

  getCountries();
  appendCountries();
  getLanguages();
  appendLanguages();
  showBooks(books.slice(0, 50));
} else if (document.location.href.includes('/index.html')) {

  // BOOK LIST
  const elBooksList = document.querySelector('.books-hero__index-list');

  // BOOK CARD
  const elBookCardTemp = document.querySelector('#book-card-temp').content;

  function findNewBooks() {
    
    books.filter(book => {
      if (book.year > 1980) {
        newBooksList.push(book);
      }
    });
  }

  function showNewBooks() {
    let elNewDocFragment = document.createDocumentFragment();
    for (const item of newBooksList) {
      const elNewBookItem = elBookCardTemp.cloneNode(true);
      elNewBookItem.querySelector('.book-card__img').src = item.imageLink;
      elNewBookItem.querySelector('.book-card__img').alt = item.title;
      elNewBookItem.querySelector('.book-card__book-name').textContent = item.title;
      elNewBookItem.querySelector('.book-card__author-name').textContent = item.author;
      elNewBookItem.querySelector('.book-card__year').textContent = item.year;
      elNewBookItem.querySelector('.book-card__pages').textContent = item.pages;
      elNewBookItem.querySelector('.book-card__language').textContent = item.language;
      
      elNewDocFragment.appendChild(elNewBookItem);
    }
    elBooksList.innerHTML = '';
    elBooksList.appendChild(elNewDocFragment);
    
  }

  findNewBooks();
  showNewBooks();
}

// Toggle navigation
function toggleNavActive() {
  elNavigation.classList.toggle('header-navigation__nav--active');
  elNavToggler.classList.toggle('header-navigation__links-toggle--open');
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
