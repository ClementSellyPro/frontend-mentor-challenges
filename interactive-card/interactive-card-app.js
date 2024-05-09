/* --------------- DOM ELEMENT SELECTION --------------- */

//Card section
let nameOnCard = document.querySelector('.front-name');
let numberOnCard = document.querySelector('.cardFrontSide-number');
let dateOnCard = document.querySelector('.front-date');

let cvcOnCard = document.querySelector('.cardBackSide-cvc');

//form section
let formSection = document.querySelector('.formSection');
let nameInput = document.querySelector('#cardName');
let numberInput = document.querySelector('#cardNumber');
let monthInput = document.querySelector('#dateExpiration');
let yearInput = document.querySelector('#dateExpiration-year');
let cvcInput = document.querySelector('#cvc');

let validateBtn = document.querySelector('.validate-btn');

let validationSection = document.querySelector('.validation-group');
let continueBtn = document.querySelector('.continue-btn');

/* --------------- VARIABLE INITIALIZATION --------------- */
let numberStorage = '0000000000000000';
let nameStorage = '';
let monthStorage = '00';
let yearStorage = '00';
let cvcStorage = '';


/* --------------- EVENT        --------------- */
nameInput.addEventListener('keyup', (e) => {
    getName(e.target.value);
    nameOnCard.innerHTML = '';
    nameOnCard.innerHTML = nameStorage;
});

numberInput.addEventListener('keyup', (e) => {
    getNumber(e.target.value);
    numberOnCard.innerHTML = '';
    numberOnCard.innerHTML = numberStorage;
});

monthInput.addEventListener('keyup', (e) => {
    getMonth(e.target.value);
    displayDateOnCard();
})
yearInput.addEventListener('keyup', (e) => {
    getYear(e.target.value);
    displayDateOnCard();
});

cvcInput.addEventListener('keyup', (e) => {
    getCVC(e.target.value);
    cvcOnCard.innerHTML = '';
    cvcOnCard.innerHTML = cvcStorage;
});


validateBtn.addEventListener('click', () => {
    nameInput.value = '';
    numberInput.value = '';
    monthInput.value = '';
    yearInput.value = '';
    cvcInput.value = '';
    formSection.classList.add('hide');
    validationSection.classList.remove('hide');
});

continueBtn.addEventListener('click', () => {
    validationSection.classList.add('hide');
    formSection.classList.remove('hide');
});

/* --------------- FUNCTIONS --------------- */
function getName(input){
    nameStorage = '';
    nameStorage = input;
}

function getNumber(input){
    numberStorage = '';
    numberStorage = input;
}

function getMonth(input){
    monthStorage = '';
    monthStorage = input
}

function getYear(input){
    yearStorage = '';
    yearStorage = input;
}

function getCVC(input){
    cvcStorage = '';
    cvcStorage = input;
}

function displayDateOnCard(){
    dateOnCard.innerHTML = '';
    dateOnCard.innerHTML = `${monthStorage}/${yearStorage}`
}

// onchange number field
function rewriteNumber(value){
    let newValue = value.replace(/[^0-9]/gi, '')
    .replace(/(.{4})/g, '$1 ').trim();

    numberInput.value = newValue;
}
