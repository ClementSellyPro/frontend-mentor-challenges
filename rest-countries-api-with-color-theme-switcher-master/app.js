/* -------------------- DOM elements select -------------------- */
let body = document.querySelector('body');
let btnTheme = document.querySelector('.theme-toggle-section');





/* -------------------- EVENTS             -------------------- */
btnTheme.addEventListener('click', () => {
    if(body.classList.contains('dark')){
        body.classList.remove('dark');
    }else{
        body.classList.add('dark');
    }
});

// SAVE TO LOCAL STORAGE TO KEEP THE DARK THEME !!!!!!!!!!!