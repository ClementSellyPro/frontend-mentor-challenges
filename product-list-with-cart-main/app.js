/* -------------------- Variables init   -------------------- */
let orderList = [];


/* -------------------- DOM element      -------------------- */
const cardsSection = document.querySelector('.cards-section');
const emptyCart = document.querySelector('.cart__empty');
const filledCart = document.querySelector('.cart__filled');
const filledCartItems = document.querySelector('.cart__filled-items');
const cartItemsNumber = document.querySelector('.cart-items-number');


/* -------------------- Functions       -------------------- */
// function to display all the food card
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
// function to add an item in the list (orderList array)
function addNewItem(id, data){
    orderList.push(data[id]);
}
// check if orderList is empty or not, to display the empty message or the list
function isCartEmpty(orderList){
    if(orderList.length === 0){
        if(filledCart.classList.contains('hidden') || emptyCart.classList.contains('hidden')){
            filledCart.classList.add('hidden');
            emptyCart.classList.remove('hidden');
            console.log('orderList vide');
        }
    }else{
        if(emptyCart.classList.contains('hidden') || filledCart.classList.contains('hidden')){
            emptyCart.classList.add('hidden');
            filledCart.classList.remove('hidden');
            console.log('orderList pas trop vide');
        }
    }
}
// display the orderList in the Cart section
function displayCartItems(orderList){
    filledCartItems.innerHTML = '';
    for(let i = 0; i < orderList.length; i++){
        let orderListItem = document.createElement('div');
        orderListItem.setAttribute('class', 'cart__filled-row');

        orderListItem.innerHTML = `
          <div class="cart__filled-title">${orderList[i].name}</div>
          <div class="cart__filled-details">
            <div class="cart__filled-amount">2x</div>
            <div class="cart__filled-price">@ $${orderList[i].price}</div>
            <div class="cart__filled-total-price">$11.00</div>
          </div>
          <img class="cart__delete-btn" src="/assets/images/icon-remove-item.svg" alt="Delete button" />`;

        filledCartItems.appendChild(orderListItem);
    }
    cartItemsNumber.innerHTML = orderList.length;
}


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

    // EVENT on add buttons
    for(let i = 0; i < addButtons.length; i++){
        addButtons[i].addEventListener('click', (e) =>{
            let targetID = e.target.parentElement.parentElement.dataset.id;
            // add new item to orderList array
            addNewItem(targetID, data);
            // check if orderList is empty
            isCartEmpty(orderList);
            console.log(orderList);
            // display orderList items in Cart section
            displayCartItems(orderList);
        });
    }
}

execution();