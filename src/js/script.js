const humburger = document.querySelector('.humburger'),
    menu = document.querySelector('.menu'),
    closeBtn = document.querySelector('.menu__close');

humburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    menu.classList.remove('active');
});

//counter 

const counters = document.querySelectorAll('.skills__ratings-counter'),
    lines =document.querySelectorAll('.skills__ratings-line span');

counters.forEach((counter, i) => {
    lines[i].style.width = counter.textContent;
});