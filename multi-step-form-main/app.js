/* -------------------- DOM ELEMENT SELECTION -------------------- */
// modal
let modalOne = document.querySelector('.step-one-modal');
let modalTwo = document.querySelector('.step-two-modal');
let modalThree = document.querySelector('.step-three-modal');
let modalFour = document.querySelector('.step-four-modal');
let modalFive = document.querySelector('.step-five-modal');



// buttons
let btnNextOne = document.querySelector('.btn-next-step-one');
let btnBackTwo = document.querySelector('.btn-back-step-two');
let btnNextTwo = document.querySelector('.btn-next-step-two');
let btnBackThree = document.querySelector('.btn-back-step-three');
let btnNextThree = document.querySelector('.btn-next-step-three');
let btnBackFour = document.querySelector('.btn-back-step-four');
let btnConfirm = document.querySelector('.btn-confirm');



/* --------------------      FUNCTIONS       -------------------- */





/* --------------------      EVENTS         -------------------- */
/* ----- change modal pages ----- */
// page 1 to page 2
btnNextOne.addEventListener('click', () => {
    modalOne.classList.add('hidden');
    modalTwo.classList.remove('hidden');
});
// page 2 to page 1
btnBackTwo.addEventListener('click', () => {
    modalTwo.classList.add('hidden');
    modalOne.classList.remove('hidden');
});
// page 2 to page 3
btnNextTwo.addEventListener('click', () => {
    modalTwo.classList.add('hidden');
    modalThree.classList.remove('hidden');
});
// page 3 to page 2
btnBackThree.addEventListener('click', () => {
    modalThree.classList.add('hidden');
    modalTwo.classList.remove('hidden');

})
// page 3 to page 4
btnNextThree.addEventListener('click', () => {
    modalThree.classList.add('hidden');
    modalFour.classList.remove('hidden');
})
// page 4 to page 3
btnBackFour.addEventListener('click', () => {
    modalFour.classList.add('hidden');
    modalThree.classList.remove('hidden');
})