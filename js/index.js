'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);



const getTicketBtns = document.querySelectorAll('.btn-link');
const ticketModal = document.getElementById('ticketConfirmed');

getTicketBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    ticketModal.classList.add('show');

    setTimeout(() => {
      ticketModal.classList.remove('show');
    }, 2000);
  });
});

  const emailInput = document.getElementById('emailInput');
  const subscribeBtn = document.getElementById('subscribeBtn');
  const modal = document.getElementById('subscriptionSuccess');

  // Email doğrulama regex
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Buton aktif/pasif kontrolü
  emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();
    subscribeBtn.disabled = !isValidEmail(email);
  });

  // Abonelik işlemi
  subscribeBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) return;

    // Modal göster
    modal.classList.add('show');

    // Email temizle ve buton pasif yap
    emailInput.value = '';
    subscribeBtn.disabled = true;

    setTimeout(() => {
      modal.classList.remove('show');
    }, 2000);
  });




  