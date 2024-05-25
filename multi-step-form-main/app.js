/* -------------------- DOM ELEMENT SELECTION -------------------- */
// sidebar numbers
let stepNumbers = document.querySelectorAll('.step-number');

// modal
let modalOne = document.querySelector('.step-one-modal');
let modalTwo = document.querySelector('.step-two-modal');
let modalThree = document.querySelector('.step-three-modal');
let modalFour = document.querySelector('.step-four-modal');
let modalFive = document.querySelector('.step-five-modal');

// modal one - Personnal info
let inputName = document.getElementById('name');
let inputMail = document.getElementById('mail');
let inputPhone = document.getElementById('phone');

// modal two - Select your plan
let planSelectionCards = document.querySelectorAll('.plan-selection-card');
let billingChoice = document.querySelector('.switch-billing-choice');

// buttons
let btnNextOne = document.querySelector('.btn-next-step-one');
let btnBackTwo = document.querySelector('.btn-back-step-two');
let btnNextTwo = document.querySelector('.btn-next-step-two');
let btnBackThree = document.querySelector('.btn-back-step-three');
let btnNextThree = document.querySelector('.btn-next-step-three');
let btnBackFour = document.querySelector('.btn-back-step-four');
let btnConfirm = document.querySelector('.btn-confirm');

/* -------------------- VARIABLES INITIALIZATION -------------------- */
let userName = '';
let userMail = '';
let userPhone = '';
let planSelected = '';
let planSelectionBillChoice = '';
let addOnsSelection = [];

/* --------------------      FUNCTIONS       -------------------- */
function updateUI(){
    changeStepNumber();
}

function changeStepNumber(){
    if(!modalOne.classList.contains('hidden')){
        resetStepNumberFocus();
        stepNumbers[0].classList.add('focus');
    }else if(!modalTwo.classList.contains('hidden')){
        resetStepNumberFocus();
        stepNumbers[1].classList.add('focus');
    }else if(!modalThree.classList.contains('hidden')){
        resetStepNumberFocus();
        stepNumbers[2].classList.add('focus');
    }else if(!modalFour.classList.contains('hidden')){
        resetStepNumberFocus();
        stepNumbers[3].classList.add('focus');
    }
}

function resetStepNumberFocus(){
    for(let i = 0; i < stepNumbers.length; i++){
        if(stepNumbers[i].classList.contains('focus')){
            stepNumbers[i].classList.remove('focus')
        }
    }
}

// modal 1 - get input data - see the event (page 1 to page 2)
function getUserInfo(){
    userName = inputName.value;
    userMail = inputMail.value;
    userPhone = inputPhone.value;
}

// modal 2 - plan selected and billing - see the events for modal 2
function planSelection(){

}

/* --------------------      EVENTS         -------------------- */
/* ----- change modal pages ----- */
// page 1 to page 2
btnNextOne.addEventListener('click', () => {
    if(inputName.value !== '' && inputMail.value != '' && inputPhone.value != ''){
        modalOne.classList.add('hidden');
        modalTwo.classList.remove('hidden');
        getUserInfo();
        updateUI();
    }
});
// page 2 to page 1
btnBackTwo.addEventListener('click', () => {
    modalTwo.classList.add('hidden');
    modalOne.classList.remove('hidden');
    updateUI();
});
// page 2 to page 3
btnNextTwo.addEventListener('click', () => {
    modalTwo.classList.add('hidden');
    modalThree.classList.remove('hidden');
    updateUI();
});
// page 3 to page 2
btnBackThree.addEventListener('click', () => {
    modalThree.classList.add('hidden');
    modalTwo.classList.remove('hidden');
    updateUI();
})
// page 3 to page 4
btnNextThree.addEventListener('click', () => {
    modalThree.classList.add('hidden');
    modalFour.classList.remove('hidden');
    updateUI();
})
// page 4 to page 3
btnBackFour.addEventListener('click', () => {
    modalFour.classList.add('hidden');
    modalThree.classList.remove('hidden');
    updateUI();
})

/* Modal 2 events */
for(let i = 0; i < planSelectionCards.length; i++){
    planSelectionCards[i].addEventListener('click', (event) => {
        console.log(event.target.classList);
    });
}

billingChoice.addEventListener('click', () => {
    console.log('yes yes');
});