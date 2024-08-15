/* -------------------- Variables init   -------------------- */
let orderList = [];


/* -------------------- DOM element      -------------------- */
const cardsSection = document.querySelector('.cards-section');


/* -------------------- Functions       -------------------- */
function displayCards(data){
    for(let i = 0; i < data.length; i++){
        let currentCard = document.createElement('div');
        currentCard.setAttribute('class', 'card');
        currentCard.setAttribute('data-id', i);

        currentCard.innerHTML = `
            <div class="card__picture-part">
            <img class="card__picture" src="${data[i].image.desktop}" alt="Food" />
            <button class="card__btn">
                <img src="/assets/images/icon-add-to-cart.svg" alt="Cart" />
                Add to Cart
            </button>
            </div>
        
            <div class="card__description">
            <h3 class="card__title">${data[i].category}</h3>
            <h2 class="card__full-title">${data[i].name}</h2>
            <p class="card__price">$${data[i].price}</p>
            </div>
            `;
        cardsSection.appendChild(currentCard);
    }
}

function addNewItem(id, data){
    orderList.push(data[id]);
}


/* -------------------- EVENTS          -------------------- */



/* -------------------- EXECUTION       -------------------- */
async function execution(){
    // fetch data
    let data = await fetch('/data.json')
    .then(res => res.json())
    .then(data => data);

    // display cards with the fetched data
    displayCards(data);
    
    // collect all add buttons
    const addButtons = document.querySelectorAll('.card__btn');
    // event on add buttons
    for(let i = 0; i < addButtons.length; i++){
        addButtons[i].addEventListener('click', (e) =>{
            let targetID = e.target.parentElement.parentElement.dataset.id;
            addNewItem(targetID, data);
            console.log(orderList);
        });
    }
    // 
}

execution();