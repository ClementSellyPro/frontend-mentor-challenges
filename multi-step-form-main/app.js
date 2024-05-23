/* -------------------- DOM ELEMENT SELECTION -------------------- */
// modal
let modalOne = document.querySelector('.step-one-modal');
let modalTwo = document.querySelector('.step-two-modal');
let modalThree = document.querySelector('.step-three-modal');



// buttons
let btnNextOne = document.querySelector('.btn-next-step-one');
let btnBackTwo = document.querySelector('.btn-back-step-two');
let btnNextTwo = document.querySelector('.btn-next-step-two');




/* --------------------      FUNTIONS       -------------------- */





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