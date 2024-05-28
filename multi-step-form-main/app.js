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

// modal three - Pick add-ons
let addOnSelectionCards = document.querySelectorAll('.add-on-selection-card');
let addOnCheckBoxes = document.querySelectorAll('.add-on-checkbox');
let addOnPrices = document.querySelectorAll('.add-on-price');
let addOnNames = document.querySelectorAll('.selection-title-add-on');

// modal four - Finishing up (summary)
let changePlanLink = document.querySelector('.summary-plan-change-link');
let summaryPlanName  = document.querySelector('.summary-plan-name');
let summaryBilling = document.querySelector('.summary-billing');
let summaryPrice = document.querySelector('.summary-plan-price');
let summaryAddOns = document.querySelector('.summary-add-on-section');
let summaryTotalTextBilling = document.querySelector('.total-text-billing');
let summaryTotalPrice = document.querySelector('.total-price');

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
let addOnsSelection = {};
let addOnMonthlyPrice = [1,2,2];

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
    }
    if(target.classList.contains('advanced')){
        planSelectedPrice = planPrice[1].innerHTML;
    }
    if(target.classList.contains('pro')){
        planSelectedPrice = planPrice[2].innerHTML;
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

// modal 3 - add-ons picked and billing display
for(let i = 0; i < addOnSelectionCards.length; i++){
    addOnSelectionCards[i].addEventListener('click', () => {
        if(addOnSelectionCards[i].classList.contains('selected')){
            addOnSelectionCards[i].classList.remove('selected');
            addOnCheckBoxes[i].checked = false;
            delete addOnsSelection[i];
        }else{
            addOnSelectionCards[i].classList.add('selected');
            addOnCheckBoxes[i].checked = true;
            addOnsSelection[i] = `${addOnNames[i].innerText},${addOnPrices[i].innerText}`;
        }
    });
}
// execute on the Next button click in the 2nd modal
function updateAddOnPrice(){
    if(planSelectionBillChoice === 'Month'){
        for(let i = 0; i < addOnPrices.length; i++){
            addOnPrices[i].innerText = `+$${addOnMonthlyPrice[i]}/mo`;
        }
    }
    if(planSelectionBillChoice === 'Year'){
        for(let i = 0; i < addOnPrices.length; i++){
            addOnPrices[i].innerText = `+$${addOnMonthlyPrice[i]*10}/yr`;
        }
    }
}

// modal 4 - display the summary
function updateSummary(){
    // plan selected
    planSelectedCapital = planSelected[0].toUpperCase() + planSelected.slice(1);
    summaryPlanName.innerText = planSelectedCapital;
    // plan bill
    summaryPrice.innerHTML = planSelectedPrice;
    
    summaryBillingText()
    addOnListing();
    totalSum();
}
// List add-ons selected
function addOnListing(){
    summaryAddOns.innerHTML = '';
    for(const [key, value] of Object.entries(addOnsSelection)){
        let valueArray = value.split(',');

        let addOn = document.createElement('div');
        addOn.setAttribute('class', 'summary-add-on');
        addOn.innerHTML = `
        <p class="summary-add-on-name">${valueArray[0]}</p>
        <p class="summary-add-on-price">${valueArray[1]}</p>
        `
        summaryAddOns.appendChild(addOn);
    }
}
// update text according biiling choice
function summaryBillingText(){
    // billing apply
    if(planSelectionBillChoice === 'Month'){
        summaryBilling.innerText = '(Monthly)';
    }else{
        summaryBilling.innerText = '(Yearly)';
    }
    // total billing text
    if(planSelectionBillChoice === 'Month'){
        summaryTotalTextBilling.innerHTML = '(per month)'
    }else{
        summaryTotalTextBilling.innerHTML = '(per year)'
    }
}
// total price sum
function totalSum(){
    let total = 0;
    let plan = 0;
    let addOns = 0;

    for(const [key, value] of Object.entries(addOnsSelection)){
        let valueArray = value.split(',')
        console.log('length: ', valueArray[1].length);
        if(valueArray[1].length === 6){
            let result = valueArray[1].slice(2,3);
            addOns += Number(result);
        }else{
            let result = valueArray[1].slice(2,4);
            addOns += Number(result);
        }
    }

    if(planSelectedPrice.length === 5){
        let result = planSelectedPrice.slice(1,2);
        plan = Number(result);
    }else if(planSelectedPrice.length === 6){
        let result = planSelectedPrice.slice(1,3);
        plan = Number(result);
    }else{
        let result = planSelectedPrice.slice(1,4);
        plan = Number(result);
    }

    //console.log(`plan outside for loop: ${plan}`);
    //console.log(`addOns outside for loop: ${addOns}`);
    total = plan + addOns;
    //console.log(`total: ${total}`);
    if(planSelectionBillChoice === 'Month'){
        summaryTotalPrice.innerHTML = `+$${total}/mo`;
    }else{
        summaryTotalPrice.innerHTML = `+$${total}/yr`;
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
    if(planSelected !== ''){
        modalTwo.classList.add('hidden');
        modalThree.classList.remove('hidden');
        updateAddOnPrice()
        updateUI();
    }
    
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
    updateSummary();
})
// page 4 to page 3
btnBackFour.addEventListener('click', () => {
    modalFour.classList.add('hidden');
    modalThree.classList.remove('hidden');
    updateUI();
})
// page 4 to page 5
btnConfirm.addEventListener('click', () => {
    modalFour.classList.add('hidden');
    modalFive.classList.remove('hidden');
    updateUI();
});

/* ----- Modal 2 events ----- */
for(let i = 0; i < planSelectionCards.length; i++){
    planSelectionCards[i].addEventListener('click', () => {
        planSelection(planSelectionCards[i]);
    });
}

billingChoice.addEventListener('click', () => {
    billingChoiceSelection();
    planSelectedPrice
});

/* Modal 4 event */
changePlanLink.addEventListener('click', () => {
    modalFour.classList.add('hidden');
    modalTwo.classList.remove('hidden');
    updateUI();
})