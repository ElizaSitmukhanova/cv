'use strict'
document.addEventListener('DOMContentLoaded', function () {

    const forms = document.querySelectorAll('form');
    const formReq = document.querySelectorAll('.req');
    const inputs = document.querySelectorAll('input');
    const closeModalBtn = document.querySelector('.modal__close');
    const modal = document.querySelector('.modal');
    const overlayModal = document.querySelector('.modal__overlay');

 

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Thanks! Have you good day!',
        failure: 'Ups, error!'
    };
    
 

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let error = formValidate(form);
            //создание нового блока динамически к форме

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.classList.add('status');
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);
            request.addEventListener('load', (e) => {
                if (request.status===200){
                    console.log(request.response);
                    showThanksModal();
                    form.reset();
                  /*   setTimeout(() => {
                        statusMessage.remove();
                    }, 5000); */
                    
                } else {
                    statusMessage.textContent = message.failure;
                }
            });

        });
    }

    forms.forEach(item => {
        postData(item);
    });
    
    function showThanksModal() {
        modal.classList.add('active');
        overlayModal.classList.add('active');

        setTimeout(() => {
            modal.classList.remove('active');
            overlayModal.classList.remove('active');
        }, 2000);
    }


    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });


    function formAddError(input) {
        input.parentElement.classList.add('error');
        input.classList.add('error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function formValidate(form) {
        let error = 0;
        formReq.forEach(input => {
            if (input.value === '') {
                formAddError(input);
                error++;
                console.log('Ошибка');
            } else if (input.getAttribute('type') === 'email') {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                formAddError(input);
                error++;
                console.log('2');
            }
        });
    }










    const humburger = document.querySelector('.humburger'),
        menu = document.querySelector('.menu'),
        closeBtn = document.querySelector('.menu__close'),
        overlay = document.querySelector('.menu__overlay');

   function openMenu () {
        menu.classList.add('active');

    }

    function closeMenu () {
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