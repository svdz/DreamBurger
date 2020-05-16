document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    // const modalWrap = document.querySelector('.modal');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const burgerBtn = document.getElementById('burger');
    burgerBtn.style.display = "none";

    let clientWidth = document.documentElement.clientWidth;
    // console.dir('document.documentElement: ', document.documentElement);

    if(clientWidth < 768) {
        burgerBtn.style.display = 'flex';
    } else {
        burgerBtn.style.display = 'none';
    }

    const playTest = () => {
        const renderQuestions = () => {
            questionTitle.textContent = 'Какого цвета бургер вы хотите?'

            const burger1 = 'Стандарт'
            const burger1Image = './image/burger.png';
            const burger2 = 'Черный';
            const burger2Image = './image/burgerBlack.png';

            formAnswers.innerHTML = `
                <div class="answers-item d-flex flex-column">
                    <input type="radio" id="answerItem1" name="answer" class="d-none">
                    <label for="answerItem1" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src=${burger1Image} alt="burger">
                    <span>${burger1}</span>
                    </label>
                </div>
                <div class="answers-item d-flex justify-content-center">
                    <input type="radio" id="answerItem2" name="answer" class="d-none">
                    <label for="answerItem2" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src=${burger2Image} alt="burger">
                    <span>${burger2}</span>
                    </label>
                </div>
            `;
            console.log('render');
        };

        renderQuestions();
    };

    btnOpenModal.addEventListener('click', () => {
        // console.log(': ', btnOpenModal);
        modalBlock.classList.add('d-block');
        burgerBtn.classList.add('active');
        playTest();
    });

    window.addEventListener('resize', () => {
        clientWidth = document.documentElement.clientWidth;
        // console.log(clientWidth);
        if (clientWidth < 768) {
            burgerBtn.style.display = 'flex';
        } else {
            burgerBtn.style.display = 'none';
        }
    });

    burgerBtn.addEventListener('click', () => {
        // if (burgerBtn.classList.contains('active')) {
        //     burgerBtn.classList.remove('active');
        // } else {
        //     burgerBtn.classList.add('active');
        // }

        burgerBtn.classList.add('active');
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
        burgerBtn.classList.remove('active');
    });

    document.addEventListener('click', (event) => {
        // console.log('event: ', event.target.closest('.openModalButton'));

        if(
        !event.target.closest('.modal-dialog') &&
        !event.target.closest('.openModalButton') && 
        !event.target.closest('.burger')) {
            modalBlock.classList.remove('d-block');
            burgerBtn.classList.remove('active');
        }
    });

    // modalWrap.addEventListener('click', () => {
    //     modalBlock.classList.remove('d-block');
    // }); //buggy solution

});
