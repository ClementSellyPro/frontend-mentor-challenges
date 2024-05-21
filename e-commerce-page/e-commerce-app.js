/* -------------------- DOM ELEMENT -------------------- */
let cartIcon = document.querySelector('.profile-cart img');
let cartModal = document.querySelector('.modal-cart');
let btnHamburger = document.querySelector('.logo-hamburger-section');
let nav = document.querySelector('nav');
let btnClose = document.querySelector('.btn-close');
// add amount of items
let minus = document.querySelector('.icon-minus');
let plus = document.querySelector('.icon-plus');
let amountItems = document.querySelector('.amount-items span');
let btnAddItems = document.querySelector('.add-btn');
// cart modal
let numberItemsOnCartIcon = document.querySelector('.number-item-on-cart-icon');
let listItemsInCart = document.querySelector('.modal-cart-items-list');
let btnDeleteItem = document.querySelector('.icon-delete-cart');

let itemInformation = document.querySelector('.information-section');
let currentItem = itemInformation.dataset.id;
// Image navigation for mobile format
let previousImage = document.querySelector('.icon-previous-box');
let nextImage = document.querySelector('.icon-next-box');

// main image and list thumbnails
let currentMainImage = document.querySelector('.main-image');
let listThumbnails = document.querySelectorAll('.images-list li img');
// width screen to hide nav for mobile screen
let width = window.innerWidth;
if(width < 768){
    nav.classList.add('hidden');
}else if(width > 768){
    nav.classList.remove('hidden');
}

/* -------------------- VARIABLES -------------------- */
let amountItemsCounter = 0;
let itemsCartList = [];

let currentMainImageCounter = 1;
let currentThumbnailSelected = 1;


/* -------------------- FUNCTIONS -------------------- */
function updateUI(){
    // display items quantity into cart
    amountItems.innerHTML = amountItemsCounter;
    if(itemsCartList.length > 0){
        numberItemsOnCartIcon.innerHTML = itemsCartList.length;
    }else{
        numberItemsOnCartIcon.innerHTML = '';
    }
    // cart modal display
    if(itemsCartList.length === 0){
        noItemMessage();
    }else{
        itemsIntoCart();
        btnDeleteItem.addEventListener('click', (e) => {
            itemsCartList.forEach(element => {
                if(element.id === e.target.parentElement.dataset.id){
                    let index = itemsCartList.indexOf(element.id);
                    itemsCartList.splice(index, 1);
                }
            });
            updateUI();
        });
    }
    // update current main image
    displayMainImage(currentThumbnailSelected);
    currentMainImage.src = `images/image-product-${currentMainImageCounter}.jpg`;
}

function itemsIntoCart(){
    listItemsInCart.innerHTML = '';
    let items = document.createElement('div');
    items.setAttribute('class', 'modal-cart-item');

    itemList = '';
    for(let i = 0; i < itemsCartList.length; i++){
        items.setAttribute('data-id', itemsCartList[i].id);
        itemList += `
        <img class="cart-item-img" src="${itemsCartList[i].image}" alt="">
        <div class="cart-item-information">
            <div class="cart-item-information-name">
                Fall Limited Edition Sneakers
            </div>
            <div class="cart-item-information-price">
                $ ${itemsCartList[i].price} x <span class="number-item-cart">${itemsCartList[i].quantity}</span> <span class="total-price-cart">$ ${itemsCartList[i].price * itemsCartList[i].quantity}</span>
            </div>
        </div>
        <img class="icon-delete-cart" src="images/icon-delete.svg" alt="">
        `
    }
    items.innerHTML = itemList;
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.innerHTML = 'Checkout';
    
    listItemsInCart.appendChild(items);
    listItemsInCart.appendChild(button);
    btnDeleteItem = document.querySelector('.icon-delete-cart');
}
function noItemMessage(){
    listItemsInCart.innerHTML = '';
    let noItemMessage = document.createElement('div');
    noItemMessage.setAttribute('class', 'modal-cart-no-item');
    noItemMessage.innerHTML = `<p>Your cart is empty</p>`;
        
    listItemsInCart.appendChild(noItemMessage);
}

function displayMainImage(indexThumbnail){
    currentMainImage.src = `images/image-product-${indexThumbnail}.jpg`;
}

/* -------------------- EVENTS -------------------- */
minus.addEventListener('click', () => {
    if(amountItemsCounter > 0){
        amountItemsCounter--;
    }
    updateUI();
});
plus.addEventListener('click', () => {
    amountItemsCounter++;
    updateUI();
})
btnAddItems.addEventListener('click', () => {
    let newItem = {id: currentItem, price: 125.00, image:'images/image-product-1-thumbnail.jpg', quantity: amountItemsCounter};
    itemsCartList.push(newItem);
    updateUI();
});

// Image navigation for mobile format
previousImage.addEventListener('click', () => {
    if(currentMainImageCounter === 1){
        currentMainImageCounter = 4;
    }else{
        currentMainImageCounter--;
    }
    updateUI();
});
nextImage.addEventListener('click', () => {
    if(currentMainImageCounter === 4){
        currentMainImageCounter = 1;
    }else{
        currentMainImageCounter++;
    }
    updateUI();
});

// Open cart modal
cartIcon.addEventListener('click', () => {
    if(cartModal.classList.contains('hidden')){
        cartModal.classList.remove('hidden');
    }else{
        cartModal.classList.add('hidden');
    }
});

window.addEventListener('click', (e) => {// 
    if(e.target.className !== 'profile-cart-icon' && 
       e.target.className !== 'modal-cart-items-list' && 
       e.target.className !== 'modal-cart-no-item' && 
       e.target.className !== 'modal-cart-header' && 
       e.target.tagName !== 'SPAN'
    ){
        cartModal.classList.add('hidden');
        console.log(e.target)
    }
});

// select thumbnail to display 
for(let i = 0; i < listThumbnails.length; i++){
    listThumbnails[i].addEventListener('click', () => {
    listThumbnails[currentThumbnailSelected - 1].classList.remove('focus-image');
        let id = listThumbnails[i].dataset.id;
        listThumbnails[i].classList.add('focus-image');
        currentThumbnailSelected = id;
        displayMainImage(currentThumbnailSelected)
    });
    updateUI();
}


// Open nav links
btnHamburger.addEventListener('click', () => {
    nav.classList.remove('hidden');
});
btnClose.addEventListener('click', () => {
    nav.classList.add('hidden');
});

window.addEventListener('load', () => {
    updateUI()
});