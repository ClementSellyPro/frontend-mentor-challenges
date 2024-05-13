/* --------------- VARIABLES INITIALIZATION --------------- */
let taskList = ['Manger', 'Boire', 'Lire des lives'];

// 'Manger', 'Boire', 'Lire des lives'


/* --------------- DOM ELEMENT SELECTIONS --------------- */
let body = document.querySelector('body');
let themeBtn = document.querySelector('.icon-theme');

let input = document.querySelector('.input-field')
let addBtn = document.querySelector('.add-icon');

let todoListDOM = document.querySelector('.todo-list');
let allTaskElement = [todoListDOM.querySelectorAll('.todo-element')];


/* ---------------         FUNCTIONS        --------------- */
function noTaskMessage(){
    todoListDOM.innerHTML = '';
    if(taskList.length === 0){
        let noTaskMessageBox = document.createElement('div');
        noTaskMessageBox.setAttribute('class', 'noTaskMessageBox');
        let noTaskMessageTxt = document.createElement('p')
        noTaskMessageTxt.innerHTML = 'No task to do for the moment. <br/> Please add a new task from the input field upper'
        
        noTaskMessageBox.appendChild(noTaskMessageTxt);
        todoListDOM.appendChild(noTaskMessageBox);
    }
}
// add a new task from the input field
function addNewTask(){
    if(input.value !== ''){
        taskList.push(input.value);
    }
    //reset input field
    input.value = '';
}
// display all task on the list
function displayTaskList(){
    todoListDOM.innerHTML = '';
    for(let i = 0; i < taskList.length; i++){
        let todoElement = document.createElement('div');
        todoElement.setAttribute('class', 'todo-element');

        // let checkbox = document.createElement('div');
        // checkbox.setAttribute('class', 'checkbox');
        todoElement.innerHTML = `
            <div class="checkbox"></div> 
            <p> ${taskList[i]} </p>
            <div class="deleteTask"><img src="images/icon-cross.svg" alt=""></div>
        `
        todoListDOM.appendChild(todoElement);
    }
}
// remove a task from the list
function removeTask(){
    console.log('yes');
}
// update the display function
function updateDisplay(){
    noTaskMessage();
    if(taskList.length > 0){
        displayTaskList();
    }
    //refresh the array of task
    allTaskElement = document.querySelectorAll('.todo-element');
}

/* ---------------         EVENTS         --------------- */
// change the theme
themeBtn.addEventListener('click', () => {
    if(body.classList.contains('dark')){
        body.classList.remove('dark');
        themeBtn.src = 'images/icon-moon.svg';
    }else{
        body.classList.add('dark');
        themeBtn.src = 'images/icon-sun.svg';
    }
});
// add new task onClik and onKeypress
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



window.addEventListener('load', () => updateDisplay());