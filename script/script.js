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

    const prevButton = document.querySelector('#prev');
    const nextButton = document.querySelector('#next');
    const sendButton = document.querySelector('#send');
    const modalDialog = document.querySelector('.modal-dialog');
    const modalHeader = document.querySelector('.modal-header');

    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];
    
    // questions.answers.forEach((item, index, array) => {
    //     console.log(item);
    //     console.log(index);
    //     console.log(array);
    // });

    let clientWidth = document.documentElement.clientWidth;
    // console.dir('document.documentElement: ', document.documentElement);
    if(clientWidth < 768) {
        burgerBtn.style.display = 'flex';
    } else {
        burgerBtn.style.display = 'none';
    }


    let count = -100;
    // let interval;

    modalDialog.style.top = `${count}%`;
    const animateModal = () => {
        modalDialog.style.top = `${count}%`;
        count += 6;

        if(count < 0) {
            requestAnimationFrame(animateModal);
        } else {
            count = -100;
        }

        // // count++;
        // interval = requestAnimationFrame(animateModal);
        // if(count >= 0) {
        //     cancelAnimationFrame(interval);
        //     count = -100;
        // }

        // if(count >= 0) {
        //     clearInterval(interval);
        //     count = -100;
        // }
    };



    btnOpenModal.addEventListener('click', () => {
        // console.log(': ', btnOpenModal);
        
        // interval = setInterval(animateModal, 5);
        // interval = requestAnimationFrame(animateModal);
        requestAnimationFrame(animateModal);
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

        let target = event.target;
        // console.log('target: ', target);

        if(
            !target.closest('.modal-dialog') &&
            !target.closest('.openModalButton') && 
            !target.closest('.burger')
        ){
            modalBlock.classList.remove('d-block');
            burgerBtn.classList.remove('active');
        }
    });

    // modalWrap.addEventListener('click', () => {
    //     modalBlock.classList.remove('d-block');
    // }); //buggy solution



    const playTest = () => {
        
        const finalAnswers = [];
        const obj = {};

        let numberQuestion = 0;

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                // answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src=${answer.url} alt="burger">
                    <span>${answer.title}</span>
                    </label>
                 `;
                formAnswers.appendChild(answerItem);
            });
        
            // for (let i = 0; i < questions.answers.length; i++) {
            //     const answerItem = document.createElement('div');
            //     answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
            //     answerItem.innerHTML = `
            //         <input type="radio" id="answerItem1" name="answer" class="d-none">
            //         <label for="answerItem1" class="d-flex flex-column justify-content-between">
            //         <img class="answerImg" src=${questions.answers[i].url} alt="burger">
            //         <span>${questions.answers[i].title}</span>
            //         </label>
            //      `;
            //     formAnswers.appendChild(answerItem);
            //     console.log('answerItem: ', answerItem);
            // }
        };

        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';

            const questCount = questions.length;

            if (numberQuestion >= 0 && numberQuestion < questions.length) {
                questionTitle.textContent = `${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);
                modalHeader.classList.remove('d-none');
                prevButton.classList.remove('d-none');
                nextButton.classList.remove('d-none');
                sendButton.classList.add('d-none');  
                nextButton.disabled = true;
                sendButton.disabled = true;               
            } else {
                questionTitle.textContent = '';
            }

            switch (numberQuestion) {
                case 0:
                    prevButton.classList.add('d-none');
                    break;
                case questCount:
                    prevButton.classList.add('d-none');
                    nextButton.classList.add('d-none');
                    sendButton.classList.remove('d-none');
                    formAnswers.innerHTML = `
                        <div class="form-group">
                            <label for="numberPhone">Enter your phone:</label>
                            <input type="phone" class="form-control" id="numberPhone">
                        </div>
                    `;

                    const numInput = document.getElementById('numberPhone');

                    numInput.onchange = 
                    numInput.oninput =
                    numInput.oncut = numInput.oncopy = numInput.onpaste
                    = () => {
                        sendButton.disabled = !numInput.value
                        // console.log(numInput.value);
                    };

                    numInput.addEventListener('input', event => {
                        // console.log(event.target.value);
                        // event.target.value = event.target.value.replace(/\D/, ''); //only digits
                        event.target.value = event.target.value.replace(/[^0-9+-]/, ''); //only digits
                    });


                    break;
                case questCount + 1:
                    modalHeader.classList.add('d-none');
                    sendButton.classList.add('d-none');
                    formAnswers.textContent = 'Спасибо! Информация будет передана менеджеру.';

                    for (let key in obj) {
                        let newObj = {};
                        newObj[key] = obj[key];
                        finalAnswers.push(newObj);
                    }
                    console.log('finalAnswers: ', finalAnswers);

                    setTimeout(() => {
                        modalBlock.classList.remove('d-block');
                        burgerBtn.classList.remove('active');
                    }, 2000);
                    break;

                // default:
                //     console.log('Not in cases');
                //     break;
            }



            // if(numberQuestion === 0) {
            //     prevButton.classList.add('d-none');                 
            // }
            // // if (numberQuestion === questions.length - 1) {
            // //     // nextButton.classList.add('d-none');
            // // }
            // if (numberQuestion === questions.length) {
            //     prevButton.classList.add('d-none');
            //     nextButton.classList.add('d-none');
            //     sendButton.classList.remove('d-none');
            //     formAnswers.innerHTML = `
            //         <div class="form-group">
            //             <label for="numberPhone">Enter your phone:</label>
            //             <input type="phone" class="form-control" id="numberPhone">
            //         </div>
            //     `;
            // }
            // if (numberQuestion === questions.length + 1) {
            //     formAnswers.textContent = 'Спасибо! Информация будет передана менеджеру.';
            //     setTimeout(() => {
            //         modalBlock.classList.remove('d-block');
            //         burgerBtn.classList.remove('active');
            //     }, 2000);
            // }

            // const burger1 = 'Стандарт'
            // const burger1Image = './image/burger.png';
            // const burger2 = 'Черный';
            // const burger2Image = './image/burgerBlack.png';

            // formAnswers.innerHTML = `
            //     <div class="answers-item d-flex flex-column">
            //         <input type="radio" id="answerItem1" name="answer" class="d-none">
            //         <label for="answerItem1" class="d-flex flex-column justify-content-between">
            //         <img class="answerImg" src=${questions.answers[0].url} alt="burger">
            //         <span>${questions.answers[0].title}</span>
            //         </label>
            //     </div>
            // `;

            // <div class="answers-item d-flex justify-content-center">
            //     <input type="radio" id="answerItem2" name="answer" class="d-none">
            //     <label for="answerItem2" class="d-flex flex-column justify-content-between">
            //     <img class="answerImg" src=${burger2Image} alt="burger">
            //     <span>${burger2}</span>
            //     </label>
            // </div>

            // console.log('render');
        };

        renderQuestions(numberQuestion);

        const checkAnswer = () => {
            
            [...formAnswers.elements]
                .filter(input => input.checked || input.id === 'numberPhone')
                .forEach((input, index) => {
                    if (numberQuestion >= 0 && numberQuestion < questions.length) {
                        obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                    }
                    if (numberQuestion === questions.length) {
                        obj[`Phone number`] = input.value;
                    }
                });

            // finalAnswers.push(obj);
        };

        const validateAnswer = () => {
            const hasSelected = [...formAnswers.elements]
                .filter(input => input.checked)
                .length > 0;
            nextButton.disabled = !hasSelected;
        };

        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        };

        nextButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        };

        sendButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);

            //PHP-mailer
        };

        document
            .getElementById('formAnswers')
            .onclick = (event) => {
                validateAnswer();
            };


        // document.querySelectorAll('.answers-item').forEach(item => {
        //     item.addEventListener('click', () => {
        //         console.log(item);
        //     });
        // });

        // document
        //     .getElementById('formAnswers')
        //     .addEventListener('click', (event) => {
        //         console.log(event.target);
        //     });
    };



});
