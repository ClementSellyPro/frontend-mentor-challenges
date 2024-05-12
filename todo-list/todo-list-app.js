/* --------------- DOM ELEMENT SELECTIONS --------------- */
let body = document.querySelector('body');
let themeBtn = document.querySelector('.icon-theme');

let input = document.querySelector('.input-field')
let addBtn = document.querySelector('.add-icon');

let todoListDOM = document.querySelector('.todo-list');

/* --------------- VARIABLES INITIALIZATION --------------- */
let taskList = [];



/* ---------------         EVENTS         --------------- */
function getInput(){
    return input.value;
}

function addNewTask(){
    let currentInput = getInput();
    taskList.push(currentInput);
    
    console.log(taskList);
    input.value = '';
}

function noTaskMessage(){
    if(taskList.length === 0){
        let noTaskMessageBox = document.createElement('div');
        noTaskMessageBox.setAttribute('class', 'noTaskMessageBox');
        let noTaskMessageTxt = document.createElement('p')
        noTaskMessageTxt.innerHTML = 'No task to do for the moment. <br/> Please add a new task from the input field upper'
        
        noTaskMessageBox.appendChild(noTaskMessageTxt);
        todoListDOM.appendChild(noTaskMessageBox);
        console.log('yes');
    }
}

function updateDisplay(){
    noTaskMessage();
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
    updateDisplay();
});

input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        addNewTask();
        updateDisplay();
    }
})

window.addEventListener('load', () => {
    updateDisplay();
});