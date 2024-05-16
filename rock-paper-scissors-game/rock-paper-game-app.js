/* ---------- DOM ELEMENT SELECTION ---------- */
let paper = document.querySelector('.paper');
let scissors = document.querySelector('.scissors');
let rock = document.querySelector('.rock');

let selectionPage = document.querySelector('.selection-section');
let opponentSelectionPage = document.querySelector('.opponent-section');
let resultPage =  document.querySelector('.result');
let resultPageMyPicked = document.querySelector('.result .my-picked');
let resultPageOpponentPicked = document.querySelector('.result .house-picked');
let rulesModal = document.querySelector('.rules-modal');

let resultMessage = document.querySelector('.result-message-text');
let scoreDisplay = document.querySelector('.score-number');
let playAgainBtn = document.querySelector('.replay-btn');
let rulesBtn = document.querySelector('.rules-btn');
let closeRulesBtn = document.querySelector('.rules-modal-close');
let resetScoreBtn = document.querySelector('.reset-score');

/* -------------------- INITIALISATION VARIABLES ---------- */

let opponentArray = ['rock', 'paper', 'scissors'];
let myPicked = '';
let opponentPicked = [];
let score = 0;
let currentStorage = localStorage.getItem('score');
if(currentStorage !== null){
    score = currentStorage;
}

/* -------------------- FUNCTIONS      -------------------- */
function getPicked(selection){
    myPicked = selection;
    changeDisplayStepTwo();
    addMyPickedToOpponentPage();
    opponentSelection();
    console.log(opponentPicked[0]);
    setTimeout(() => {
        changeDisplayStepThree()}, "3000"
    );
    displaySelectionOnResultPage(opponentPicked[0]);
    gettingResult(opponentPicked[0]);
    updateScore();
    localStorage.setItem('score', score);
}

// Change the display after user selection
function changeDisplayStepTwo(){
    opponentSelectionPage.innerHTML = '';
    selectionPage.classList.add('hide');
    opponentSelectionPage.classList.remove('hide');
}

// Display user selection on the step 2 page, waiting the opponent selection
function addMyPickedToOpponentPage(){
    let circlePicked = document.createElement('div');
    circlePicked.setAttribute('class', 'circle my-picked');

    circlePicked.innerHTML = `
        <h2>YOU PICKED</h2>
        <div class="circle-color ${myPicked}-color">
            <img src="images/icon-${myPicked}.svg" alt="Icon ${myPicked}">
        </div>`;

    opponentSelectionPage.appendChild(circlePicked);
}

// Get a random selection for the opponent, and display on the screen
function opponentSelection(){
    let random = Math.floor(Math.random() * 3);
    
    opponentPicked.push(opponentArray[random]);
    
    let circlePicked = document.createElement('div');
    circlePicked.setAttribute('class', 'circle house-picked');

    circlePicked.innerHTML = `
        <h2>THE HOUSE PICKED</h2>
        <div class="circle-color ${opponentPicked[0]}-color">
            <img src="images/icon-${opponentPicked[0]}.svg" alt="Icon ${opponentPicked[0]}">
        </div>`;

    opponentSelectionPage.appendChild(circlePicked);
}

// Display the result page
function changeDisplayStepThree(){
    opponentSelectionPage.classList.add('hide');
    resultPage.classList.remove('hide');
}

function displaySelectionOnResultPage(opponent){
    resultPageMyPicked.innerHTML = `
    <div class="circle-color ${myPicked}-color">
        <img src="images/icon-${myPicked}.svg" alt="Icon ${myPicked}">
    </div>
    `
    resultPageOpponentPicked.innerHTML = `
    <div class="circle-color ${opponent}-color">
        <img src="images/icon-${opponent}.svg" alt="Icon ${opponent}">
    </div>
    `
}

// Get the result and display a message if the user Win or Lose
function gettingResult(opponent){
    resultMessage.innerHTML = '';
    if(myPicked === opponent){
        resultMessage.innerHTML = 'DRAW';
    }else{
        if((myPicked === 'paper' && opponent === 'scissors') || 
            (myPicked === 'scissors' && opponent === 'rock') ||
            (myPicked === 'rock' && opponent === 'paper')){
            resultMessage.innerHTML = 'YOU LOSE';
        }else{
            resultMessage.innerHTML = 'YOU WIN'; //WIN
            score++;
        }
    }
}


// Update the score displayed according to the result
function updateScore(){
    scoreDisplay.innerHTML = '';
    scoreDisplay.innerHTML = String(score);
}


function playAgain(){
    resultPage.classList.add('hide');
    selectionPage.classList.remove('hide');
    updateScore();
}

// Event for the "Play Again" button, executing the playAgain() function to reinitilisate the page 
playAgainBtn.addEventListener('click', () => {
    playAgain();
    opponentPicked = [];
    myPicked = '';
});

// Reset the score
resetScoreBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});


// Display the rules
// rulesBtn.addEventListener('click', () => {
//     console.log('yes');
//     rulesModal.classList.remove('hide');
// });
closeRulesBtn.addEventListener('click', () => {
    rulesModal.classList.add('hide');
});

window.addEventListener('click', (event) => {
    console.log(event.target.className);
    if(event.target.className === 'rules-btn'){
        rulesModal.classList.remove('hide');
    }else if(!rulesModal.classList.contains('hide')){
        if(event.target.className !== 'rules-modal-img' && 
        event.target.className !== 'rules-modal-container' && 
        event.target.className !== ''){
            rulesModal.classList.add('hide');
        }
    }
});



window.onload = () => {
    updateScore();
};