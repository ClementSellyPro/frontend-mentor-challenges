/* --------------- VARIABLES INITIALIZATION --------------- */
let taskList = ['Manger', 'Boire', 'Lire des lives'];
let taskListCompleted = [];
// 'Manger', 'Boire', 'Lire des lives'


/* --------------- DOM ELEMENT SELECTIONS --------------- */
let body = document.querySelector('body');
let themeBtn = document.querySelector('.icon-theme');

let input = document.querySelector('.input-field')
let addBtn = document.querySelector('.add-icon');

let todoListDOM = document.querySelector('.todo-list');
let allTaskElement = todoListDOM.querySelectorAll('.todo-element');


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
        todoElement.setAttribute('class', `todo-element`);
        todoElement.setAttribute('data-id', `${i}`);

        // let checkbox = document.createElement('div');
        // checkbox.setAttribute('class', 'checkbox');
        todoElement.innerHTML = `
            <div class="checkbox"></div> 
            <p> ${taskList[i]} </p>
            <div class="deleteTask"><img class='delete-icon' src="images/icon-cross.svg" alt=""></div>
        `
        todoListDOM.appendChild(todoElement);
    }
}
// remove a task from the list
function removeTask(target){
    if(target.classList.contains('delete-icon')){
        let elementTarget = target.parentElement.parentElement;
        let idElement = elementTarget.getAttribute('data-id')
        taskList.splice(idElement, 1);
        updateDisplay()
    }
    
}
// mark a task as completed or not
function markAsCompleted(target){
    let idElement = target.parentElement.getAttribute('data-id');
    if(target.parentElement.classList.contains('checked')){
        target.parentElement.classList.remove('checked');
        target.parentElement.innerHTML = '';
        taskListCompleted.pop(taskList[idElement]);
    }
    if(target.classList.contains('checked')){
        target.classList.remove('checked');
        target.innerHTML = '';
        taskListCompleted.pop(taskList[idElement]);
    }
    if(target.classList.contains('checkbox')){
        target.classList.add('checked');
        target.innerHTML = '<img src="images/icon-check.svg" alt=""></img>';
        taskListCompleted.push(taskList[idElement]);
    }
    console.log(taskListCompleted);
}
// update the display function
function updateDisplay(){
    noTaskMessage();
    if(taskList.length > 0){
        displayTaskList();
    }
    //refresh the array of task
    allTaskElement = document.querySelectorAll('.todo-element');
    //event click on element
    elementOnClick(allTaskElement);
}

// element onClick actions (mark completed, remove)
function elementOnClick(list){
    for(let i = 0; i < list.length; i++){
        list[i].addEventListener('click', (e) => {
            let target = e.target;
            markAsCompleted(target);
            removeTask(target);
        });
    }
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