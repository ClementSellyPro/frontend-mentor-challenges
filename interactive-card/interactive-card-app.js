/* --------------- DOM ELEMENT SELECTION --------------- */

//Card section
let nameOnCard = document.querySelector('.front-name');
let numberOnCard = document.querySelector('.cardFrontSide-number');
let dateOnCard = document.querySelector('.front-date');

let cvcOnCard = document.querySelector('.cardBackSide-cvc');

//form section
let nameInput = document.querySelector('#cardName');
let numberInput = document.querySelector('#cardNumber');
let monthInput = document.querySelector('#dateExpiration');
let yearInput = document.querySelector('#dateExpiration-year');
let cvcInput = document.querySelector('#cvc');

/* --------------- VARIABLE INITIALIZATION --------------- */
let numberStorage = '0000 0000 0000 0000';
let nameStorage = '';
let monthStorage = '';
let yearStorage = '';
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
})

monthInput.addEventListener('keyup', (e) => {
    getMonth(e.target.value);
    displayDateOnCard();
})
yearInput.addEventListener('keyup', (e) => {
    getYear(e.target.value);
    displayDateOnCard();
})

cvcInput.addEventListener('keyup', (e) => {
    getCVC(e.target.value);
    cvcOnCard.innerHTML = '';
    cvcOnCard.innerHTML = cvcStorage;
})


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
    console.log(`cvcStorage is : ${cvcStorage}`);
}

function displayNumberOnCard(input){
    numberStorage = '0000 0000 0000 0000'
    for(let i = 0; i < input.length; i++){
        numberStorage[i] = input[i];
    }
}

function displayDateOnCard(){
    dateOnCard.innerHTML = '';
    dateOnCard.innerHTML = `${monthStorage}/${yearStorage}`
}