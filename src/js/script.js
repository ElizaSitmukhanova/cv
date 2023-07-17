document.addEventListener('DOMContentLoaded', function () {

  const form = document.querySelector('#form');
  const buttonContacts = document.querySelector('#contacts__btn');

  const formArr = Array.from(form);
  const validInputArr = [];

  formArr.forEach((el) => {
    if (el.hasAttribute("data-reg") || el.checked === false) {
      el.setAttribute("is-valid", "0");
      validInputArr.push(el);
    }
  });

  console.log(validInputArr);

  form.addEventListener('input', inputHandler);
  buttonContacts.addEventListener("submit", formCheck);

  function inputHandler({ target }) {
    if (target.hasAttribute('data-reg')) {
      inputCheck(target);
    }

    if (target.getAttribute('type') === 'checkbox') {
      checkboxCheck(target);
    }
  }

  function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute('data-reg');
    const reg = new RegExp(inputReg);
    console.log(inputValue, reg);
    if (reg.test(inputValue) && inputValue != '') {
      el.setAttribute("is-valid", "1");
      el.style.border = '2px solid green';
      el.style.backgroundColor = 'white';

    } else {
      el.setAttribute("is-valid", "0");
      el.style.border = '2px solid red';
      el.style.backgroundColor = 'white';
    }
  }

  function checkboxCheck(el) {
    if (el.checked === false) {
      el.setAttribute("is-valid", "0");
      el.style.boxShadow = '0 0 15px red';
    } else {
      el.setAttribute("is-valid", "1");
      el.style.boxShadow = '0 0 15px green';
    }
  }


  function formCheck(e) {
    e.preventDefault();
    const isallValid = [];
    validInputArr.forEach((el) => {
      isallValid.push(el.getAttribute("is-valid"));
    });
    console.log(isallValid);
    const isValid = isallValid.reduce((acc, current) => {
      return acc && current;
    });
    if (!Boolean(Number(isValid))) {
      alert("Заполните поля правильно!"); // если не правильно - сообщение пользователю
      return;
    }
    formSubmit();

  }

  function formSubmit() {
    console.log('Проверка пройдена');
  }




  const humburger = document.querySelector('.humburger'),
    menu = document.querySelector('.menu'),
    closeBtn = document.querySelector('.menu__close'),
    overlay = document.querySelector('.menu__overlay');

  function openMenu() {
    menu.classList.add('active');

  }

  function closeMenu() {
    menu.classList.remove('active');
  }

  humburger.addEventListener('click', () => {
    openMenu();
  });

  closeBtn.addEventListener('click', () => {
    closeMenu();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape") {
      closeMenu();
    }
  });

  //btn
  const trigersBtn = document.getElementById('#promo__btn'),
    link = document.getElementById('#promo__link');

  function addBtn() {
    link.classList.toggle('btn');
    trigersBtn.classList.toggle('btn');
  }

  function removeBtn() {
    link.classList.toggle('btn');
    trigersBtn.classList.toggle('btn');
  }

  trigersBtn.addEventListener('click', () => {
    addBtn();

  });

  link.addEventListener('click', () => {
    removeBtn();

  });

  //counter 

  const counters = document.querySelectorAll('.skills__ratings-counter'),
    lines = document.querySelectorAll('.skills__ratings-line span');

  counters.forEach((counter, i) => {
    lines[i].style.width = counter.textContent;
  });
});