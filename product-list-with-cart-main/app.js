/* -------------------- Variables init   -------------------- */
let orderList = [];
let totalOrder = 0;

/* -------------------- DOM element      -------------------- */
const cardsSection = document.querySelector('.cards-section');
const emptyCart = document.querySelector('.cart__empty');
const filledCart = document.querySelector('.cart__filled');
const filledCartItems = document.querySelector('.cart__filled-items');
const cartItemsNumber = document.querySelector('.cart-items-number');
const totalOrderCart = document.querySelector('.cart__filled-row-total-price');
const cartConfirmBtn = document.querySelector('.cart__confirm-btn');

const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');
const modalOrderSection = document.querySelector('.modal__order-section');
const totalOrderModal = document.querySelector('.modal__order-total-price');

const startNewOrderBtn = document.querySelector('.modal__confirm-btn');

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
    let newItem = {...data[id], 'id':id};
    orderList.push(newItem);
}

// check if orderList is empty or not, to display the empty message or the list
function isCartEmpty(orderList){
    if(orderList.length === 0){
        if(filledCart.classList.contains('hidden') || emptyCart.classList.contains('hidden')){
            filledCart.classList.add('hidden');
            emptyCart.classList.remove('hidden');
        }
    }else{
        if(emptyCart.classList.contains('hidden') || filledCart.classList.contains('hidden')){
            emptyCart.classList.add('hidden');
            filledCart.classList.remove('hidden');
        }
    }
}

// define the total order 
function defineTotal(orderList){
    totalOrder = 0;
    for(let i = 0; i < orderList.length; i++){
        totalOrder += Number(orderList[i].price);
    }
    totalOrderCart.innerHTML = `$${totalOrder}`;
    totalOrderModal.innerHTML = `$${totalOrder}`;
}

// display the orderList in the Cart section
function displayCartItems(orderList){
    filledCartItems.innerHTML = '';
    for(let i = 0; i < orderList.length; i++){
        let orderListItem = document.createElement('div');
        orderListItem.setAttribute('class', 'cart__filled-row');
        orderListItem.setAttribute('data-id', `${orderList[i].id}`)

        orderListItem.innerHTML = `
          <div class="cart__filled-title">${orderList[i].name}</div>
          <div class="cart__filled-details">
            <div class="cart__filled-amount">1x</div>
            <div class="cart__filled-price">@ $${orderList[i].price}</div>
            <div class="cart__filled-total-price">$${orderList[i].price}</div>
          </div>
          <img class="cart__delete-btn" src="/assets/images/icon-remove-item.svg" alt="Delete button" />`;

        filledCartItems.appendChild(orderListItem);
    }
    cartItemsNumber.innerHTML = orderList.length;
}

// delete selected item
function deleteItem(orderList, id){
    let index = 0;
    for(let i = 0; i < orderList.length; i++){
        if(orderList[i].id === id){
            index = i;
        }
    }
    orderList.splice(index, 1);
    displayCartItems(orderList);
    displayModalItems(orderList);
}

// display the orderList in the Cart section
function displayModalItems(orderList){
    const modalItem = document.createElement('div');
    modalItem.setAttribute('class', 'modal__order');

    for(let i = 0; i < orderList.length; i++){
        modalItem.innerHTML = `
            <img class="modal__img" src="${orderList[i].image.thumbnail}" alt="food"/>
            <div class="modal__details">
            <p class="modal__row-title">${orderList[i].name}</p>
            <p class="modal__row-price"><span>x1</span>  @ $${orderList[i].price}</p>
            </div>
            <span class="modal__row-total-item">$${orderList[i].price}</span>`;

        modalOrderSection.appendChild(modalItem);
    }
}

/* -------------------- EVENT       -------------------- */
// display and hide modal modal
cartConfirmBtn.addEventListener('click', () => {
    modalContainer.style.display = 'flex';
});
startNewOrderBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none';
})


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
            // display orderList items in Cart section, and in modal section
            defineTotal(orderList);
            displayCartItems(orderList);
            displayModalItems(orderList);

            // collect all delete button
            const deleteBtn = document.querySelectorAll('.cart__delete-btn');
            // event click delete item in cart section
            for(let j = 0; j < deleteBtn.length; j++){
                deleteBtn[j].addEventListener('click', (e) => {
                    let targetID = e.target.parentElement.dataset.id;
                    deleteItem(orderList, targetID);
                });
            }
        });
    }
}

execution();