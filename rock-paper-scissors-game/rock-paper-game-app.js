/* ---------- DOM ELEMENT SELECTION ---------- */
let paper = document.querySelector('.paper');
let scissors = document.querySelector('.scissors');
let rock = document.querySelector('.rock');

let selectionPage = document.querySelector('.selection-section');
let opponentSelectionPage = document.querySelector('.opponent-section');
let resultPage =  document.querySelector('.result');
let resultPageMyPicked = document.querySelector('.result .my-picked');
let resultPageOpponentPicked = document.querySelector('.result .house-picked');

let resultMessage = document.querySelector('.result-message-text');
let scoreDisplay = document.querySelector('.score-number');
let playAgainBtn = document.querySelector('.replay-btn');

/* ---------- INITIALISATION VARIABLES ---------- */

let opponentArray = ['rock', 'paper', 'scissors'];
let myPicked = '';
// let opponentPicked = '';
let opponentPicked = [];
let score = 0;


/* ---------- FUNCTIONS      ---------- */
function getPicked(selection){
    myPicked = selection;
    changeDisplayStepTwo();
    addMyPickedToOpponentPage();
    setTimeout(() => {
        opponentSelection()}, "1000"
    );
    setTimeout(() => {
        changeDisplayStepThree()}, "3000"
    );
    displaySelectionOnResultPage();
    gettingResult();
    updateScore();
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
    console.log(`inside ${opponentPicked[0]}`);
}

// Display the result page
function changeDisplayStepThree(){
    opponentSelectionPage.classList.add('hide');
    resultPage.classList.remove('hide');
}

function displaySelectionOnResultPage(){
    resultPageMyPicked.innerHTML = `
    <div class="circle-color ${myPicked}-color">
        <img src="images/icon-${myPicked}.svg" alt="Icon ${myPicked}">
    </div>
    `
    resultPageOpponentPicked = `
    <div class="circle-color ${opponentPicked[0]}-color">
        <img src="images/icon-${opponentPicked[0]}.svg" alt="Icon ${opponentPicked[0]}">
    </div>
    `
    
}

// Get the result and display a message if the user Win or Lose
function gettingResult(){
    resultMessage.innerHTML = '';
    if(myPicked === opponentPicked[0]){
        resultMessage.innerHTML = 'DRAW';
    }else{
        if((myPicked === 'paper' && opponentPicked[0] === 'scissors') || 
            (myPicked === 'scissors' && opponentPicked[0] === 'rock') ||
            (myPicked === 'rock' && opponentPicked[0] === 'paper')){
            resultMessage.innerHTML = 'YOU LOSE';
            if(score > 0){
                score--;
            }
        }else{
            resultMessage.innerHTML = 'YOU YOU'; //WIN
            score++;
        }
    }
    
    console.log(`my picked : ${myPicked}`);
    console.log(`house picked : ${opponentPicked[0]}`);
}

function displayResult(){
    // <div class="result-message">
    //     <!-- <h1>YOU WIN</h1> -->
    //     <button class="replay-btn" type="button"> PLAY AGAIN</button>
    // </div>
}

// Update the score displayed according to the result
function updateScore(){
    scoreDisplay = '';
    scoreDisplay.innerHTML = String(score);
}


function playAgain(){
    resultPage.classList.add('hide');
    selectionPage.classList.remove('hide');
}

// Event for the "Play Again" button, executing the playAgain() function to reinitilisate the page 
playAgainBtn.addEventListener('click', () => {
    playAgain();
    opponentPicked = [];
    myPicked = '';
});