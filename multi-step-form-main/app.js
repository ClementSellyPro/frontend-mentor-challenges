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
let planDescriptions = document.querySelectorAll('.plan-selection-card .selection-description');
let billingChoice = document.querySelector('.switch-billing-choice');
let monthlyChoiceText = document.querySelector('.monthlyChoice');
let yearlyChoiceText = document.querySelector('.yearlyChoice');
let planPrice = document.querySelectorAll('.plan-price');


// buttons
let btnNextOne = document.querySelector('.btn-next-step-one');
let btnBackTwo = document.querySelector('.btn-back-step-two');
let btnNextTwo = document.querySelector('.btn-next-step-two');
let btnBackThree = document.querySelector('.btn-back-step-three');
let btnNextThree = document.querySelector('.btn-next-step-three');
let btnBackFour = document.querySelector('.btn-back-step-four');
let btnConfirm = document.querySelector('.btn-confirm');

/* -------------------- VARIABLES INITIALIZATION -------------------- */
// modal 1
let userName = '';
let userMail = '';
let userPhone = '';
// modal 2
let planSelected = '';
let planSelectedPrice = '';
let planSelectionBillChoice = 'Month';
let planMonthlyPrice = [9, 12, 15];
// modal 3
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
function planSelection(target){
    resetSelectedPlan();
    target.classList.add('focus');
    classListSelected = target.classList;
    planSelected = classListSelected[1];
    // get the plan price
    if(target.classList.contains('arcade')){
        planSelectedPrice = planPrice[0].innerHTML;
        console.log(planSelectedPrice);
    }
    if(target.classList.contains('advanced')){
        planSelectedPrice = planPrice[1].innerHTML;
        console.log(planSelectedPrice);
    }
    if(target.classList.contains('pro')){
        planSelectedPrice = planPrice[2].innerHTML;
        console.log(planSelectedPrice);
    }
}

function resetSelectedPlan(){
    for(let i = 0; i < planSelectionCards.length; i++){
        if(planSelectionCards[i].classList.contains('focus')){
            planSelectionCards[i].classList.remove('focus');
        }
    }
}

function billingChoiceSelection(){
    if(planSelectionBillChoice === 'Month'){
        planSelectionBillChoice = 'Year';
        monthlyChoiceText.classList.remove('selected');
        yearlyChoiceText.classList.add('selected');
    }else{
        planSelectionBillChoice = 'Month';
        monthlyChoiceText.classList.add('selected');
        yearlyChoiceText.classList.remove('selected');
    }
    updatePlanCardUI();
}

function updatePlanCardUI(){
    if(planSelectionBillChoice === 'Year'){
        for(let i = 0; i < planDescriptions.length; i++){
            let freeMonthsText = document.createElement('div');
            freeMonthsText.setAttribute('class', 'freeMonths');
            freeMonthsText.innerHTML = '2 months free';
            planDescriptions[i].appendChild(freeMonthsText);
            // update the price according billing choice (yearly)
            planPrice[i].innerHTML = `$${planMonthlyPrice[i]*10}/yr`;
        }
    }
    if(planSelectionBillChoice === 'Month'){
        let freeMonthsList = document.querySelectorAll('.freeMonths');
        for(let i = 0; i < planDescriptions.length; i++){
            planDescriptions[i].removeChild(freeMonthsList[i]);
            // update the price according billing choice (monthly)
            planPrice[i].innerHTML = `$${planMonthlyPrice[i]}/mo`;
        }
    }
}


/* --------------------      EVENTS         -------------------- */
/* ----- change modal pages ----- */
// page 1 to page 2
btnNextOne.addEventListener('click', (event) => {
    event.preventDefault();
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

/* ----- Modal 2 events ----- */
for(let i = 0; i < planSelectionCards.length; i++){
    planSelectionCards[i].addEventListener('click', (event) => {
        planSelection(planSelectionCards[i]);
    });
}

billingChoice.addEventListener('click', () => {
    billingChoiceSelection();
});