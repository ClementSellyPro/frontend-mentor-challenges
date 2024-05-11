/* --------------- DOM ELEMENT SELECTIONS --------------- */
let body = document.querySelector('body');
let themeBtn = document.querySelector('.icon-theme');

let input = document.querySelector('.input-field')
let addBtn = document.querySelector('.add-icon');


/* --------------- VARIABLES INITIALIZATION --------------- */
let taskList = [];



/* ---------------         EVENTS         --------------- */
function getInput(){
    return input.value;
}

function addNewTask(){
    let currentInput = getInput();
    taskList.push(currentInput);
    alert(taskList);
    input.value = '';
}

/* ---------------         EVENTS         --------------- */
themeBtn.addEventListener('click', () => {
    if(body.classList.contains('dark')){
        body.classList.remove('dark');
        themeBtn.src = 'images/icon-moon.svg';
    }else{
        body.classList.add('dark');
        themeBtn.src = 'images/icon-sun.svg';
    }
});

addBtn.addEventListener('click', () => {
    addNewTask();
});

input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        addNewTask();
    }
})