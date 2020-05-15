document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');

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
        console.log(': ', btnOpenModal);
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });

});
