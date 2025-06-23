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


/* Cart */

let listCartHTML = document.querySelector('.listCart');
let iconCart = document.getElementById('cart');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');

iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})




document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".addCart");
  const listCart = document.querySelector(".listCart");
  const buttonBadge = document.querySelector(".btn-badge");
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  function updateLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  function updateCartBadge(count) {
    buttonBadge.textContent = count;
  }

  function updateAllButtons() {
    addToCartButtons.forEach(button => {
      const courseCard = button.closest(".course-card");
      const courseTitle = courseCard.querySelector(".card-title").textContent;
      const isInCart = cartItems.some(item => item.title === courseTitle);

      button.innerHTML = isInCart
        ? '<ion-icon name="bag-remove-outline" aria-hidden="true"></ion-icon> Remove from Cart'
        : '<ion-icon name="bag-add-outline" aria-hidden="true"></ion-icon> Add to Cart';

      button.classList.toggle("remove-mode", isInCart);
    });
  }


  function loadCartItems() {
    listCart.innerHTML = "";
    cartItems.forEach(item => {
      const listItem = createCartItem(item.title, item.price);
      listCart.appendChild(listItem);
    });
    updateCartBadge(cartItems.length);
    updateAllButtons();
  }

  function addToCart(title, price) {
    const isAlreadyAdded = cartItems.some(item => item.title === title);
    if (!isAlreadyAdded) {
      cartItems.push({ title, price });
      updateLocalStorage();
      loadCartItems();
    }
  }

  function removeFromCart(title) {
    cartItems = cartItems.filter(item => item.title !== title);
    updateLocalStorage();
    loadCartItems();
  }

  function createCartItem(title, price) {
    const listItem = document.createElement("div");
    listItem.classList.add("cart-item");
    listItem.innerHTML = `
      <div class="item-info">
        <p class="title">${title}</p>
        <div class="item-details">
          <p>Price: $${price}</p>
        </div>
      </div>
      <button class="removeFromCart" style="width: 200px;">Remove from cart</button>
    `;
    listItem.style.marginBottom = '50px';

    const removeButton = listItem.querySelector(".removeFromCart");
    removeButton.addEventListener("click", function () {
      removeFromCart(title);
    });

    return listItem;
  }

  // Button click events for course cards
  addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
      const courseCard = button.closest(".course-card");
      const courseTitle = courseCard.querySelector(".card-title").textContent;
      const coursePrice = courseCard.querySelector(".price").getAttribute("value");

      const isInCart = cartItems.some(item => item.title === courseTitle);

      if (isInCart) {
        removeFromCart(courseTitle);
      } else {
        addToCart(courseTitle, coursePrice);
      }
    });
  });

  loadCartItems();
});


// Modal aç/bağla
document.querySelector('.checkOut').addEventListener('click', () => {
  document.getElementById('paymentModal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('paymentModal').style.display = 'none';
});


document.querySelector('.cancelButton').addEventListener('click', () => {
  document.getElementById('paymentModal').style.display = 'none';
});





const payButton = document.querySelector(".payButton");
const modal = document.getElementById("paymentModal");
const errorBox = document.getElementById("errorBox");
const paymentSuccessBox = document.getElementById("paymentSuccess");

payButton.addEventListener("click", function () {
  const cardNumber = document.getElementById("cardNumber").value.trim();
  const expDate = document.getElementById("expDate").value.trim();
  const ccv = document.getElementById("ccv").value.trim();

  const isCardNumberValid = /^\d{16}$/.test(cardNumber.replace(/\s+/g, ""));
  const isExpDateValid = /^\d{2}\/\d{2}$/.test(expDate);
  const isCCVValid = /^\d{3,4}$/.test(ccv);

  if (!isCardNumberValid || !isExpDateValid || !isCCVValid) {
    showError("Please fill out all fields correctly.");
    return;
  }

  modal.style.display = "none";

  body.classList.remove("showCart");


  // Uğurlu ödəmə qutusunu göstər
  paymentSuccessBox.classList.add("show");


  // 2 saniyə sonra bağla
  setTimeout(() => {
    paymentSuccessBox.classList.remove("show");
  }, 2000);


});

function showError(message) {
  errorBox.innerHTML = `
      <ion-icon name="alert-circle-outline"></ion-icon>
      <span>${message}</span>
    `;
  errorBox.classList.add("show");
  setTimeout(() => {
    errorBox.classList.remove("show");
  }, 20000);
}


// Tarix inputuna avtomatik '/' əlavə etmə
const expDateInput = document.getElementById('expDate');
expDateInput.addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, ''); // Rəqəm olmayan xarakterləri sil
  if (value.length > 4) value = value.slice(0, 4); // Maks 4 rəqəm al (MMYY)

  if (value.length > 2) {
    value = value.slice(0, 2) + '/' + value.slice(2);
  }

  e.target.value = value;
});


expDateInput.addEventListener('input', function (e) {
  let raw = e.target.value.replace(/\D/g, ''); // Sadəcə rəqəmləri al

  // İlk rəqəm 2-9 olarsa başa 0 əlavə et (nümunə: 3 → 03)
  if (raw.length === 1 && parseInt(raw[0]) > 1) {
    raw = '0' + raw;
  }

  // Əgər ilk rəqəm 1 isə ikinci rəqəm sadəcə 0, 1, 2 olabilər
  if (raw.length === 2 && raw[0] === '1' && !['0', '1', '2'].includes(raw[1])) {
    raw = raw[0]; // Sadece ilk rakamı bırak, ikinciyi alma
  }

  // Əgər ilk rəqəm 0 isə ikinci rəqəm 1-9 arası olmalıdır
  if (raw.length === 2 && raw[0] === '0' && raw[1] === '0') {
    raw = '0'; // 00 kimi keçərsiz isə sadəcə ilk sıfırı tut
  }

  if (raw.length > 4) raw = raw.slice(0, 4); // Ən çox 4 rəqəm

  // Avtomatik '/' əlavə et
  if (raw.length > 2) {
    raw = raw.slice(0, 2) + '/' + raw.slice(2);
  }

  e.target.value = raw;
});

const cardNumberInput = document.getElementById('cardNumber');

cardNumberInput.addEventListener('input', function (e) {
  // Rəqəm olmayan xarakterləri sil və avtomatik boşluq əlavə et
  let raw = e.target.value.replace(/\D/g, '').slice(0, 16);
  let formatted = raw.replace(/(.{4})/g, '$1 ').trim(); // Hər 4 rəqəmdən sonra boşluq
  e.target.value = formatted;
});


const ccvInput = document.getElementById('ccv');

ccvInput.addEventListener('input', function (e) {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4); // Sadəcə rəqəm
});


const cartList = document.querySelector(".listCart");
const checkOutBtn = document.querySelector(".checkOut");

function updateCheckoutButton() {
  const isEmpty = cartList.children.length === 0;
  checkOutBtn.disabled = isEmpty;
  checkOutBtn.classList.toggle("disabled", isEmpty);
}

const observer = new MutationObserver(updateCheckoutButton);
observer.observe(cartList, { childList: true, subtree: false });

window.addEventListener("DOMContentLoaded", updateCheckoutButton);