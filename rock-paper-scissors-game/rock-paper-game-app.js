/* ---------- DOM ELEMENT SELECTION ---------- */
let paper = document.querySelector('.paper');
let scissors = document.querySelector('.scissors');
let rock = document.querySelector('.rock');

let selectionPage = document.querySelector('.selection-section');
let opponentSelectionPage = document.querySelector('.opponent-section');
let resultPage =  document.querySelector('.result');


/* ---------- INITIALISATION VARIABLES ---------- */

let opponentArray = ['rock', 'paper', 'scissors'];
let myPicked = '';


/* ---------- FUNCTIONS      ---------- */
function getPicked(selection){
    myPicked = selection;
    waitHouseSelection();
    addMyPickedToOpponentPage();
    opponentSelection();
}

function waitHouseSelection(){
    selectionPage.classList.add('hide');
    opponentSelectionPage.classList.remove('hide');
}

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

function opponentSelection(){
    let random = Math.floor(Math.random() * 2 + 1);
    console.log(random);
    let circlePicked = document.createElement('div');
    circlePicked.setAttribute('class', 'circle house-picked');

    circlePicked.innerHTML = `
        <h2>THE HOUSE PICKED</h2>
        <div class="circle-color ${opponentArray[random]}-color">
            <img src="images/icon-${opponentArray[random]}.svg" alt="Icon ${opponentArray[random]}">
        </div>`;

    opponentSelectionPage.appendChild(circlePicked);
}


