/* --------------- VARIABLES INITIALIZATION --------------- */
let taskList = [];
let taskListCompleted = [];
let taskListBackUp = [];
// check the local storage to retrieve data
let actualStorage = localStorage.getItem('taskList')
if(actualStorage !== null){
    taskList = JSON.parse(localStorage.getItem('taskList', taskList));
}

/* --------------- DOM ELEMENT SELECTIONS --------------- */
let body = document.querySelector('body');
// header element
let themeBtn = document.querySelector('.icon-theme');
let input = document.querySelector('.input-field')
let addBtn = document.querySelector('.add-icon');
// todo-section element
let todoListDOM = document.querySelector('.todo-list');
let allTaskElement = todoListDOM.querySelectorAll('.todo-element');
//bottom buttons element
let clearComletedBtn = document.querySelector('.bottom-clear-completed');
let allTaskBtn = document.querySelector('.bottom-filter-all');
let activeTaskBtn = document.querySelector('.bottom-filter-active');
let completedTaskBtn = document.querySelector('.bottom-filter-completed');
let numberTaskLeft = document.querySelector('.bottom-left-items span');
// button to clear local storage
let btnClearStorage = document.querySelector('.clear-storage')

/* ---------------        FUNCTIONS      --------------- */
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
    // update local storage after adding a task
    localStorage.setItem('taskList', JSON.stringify(taskList));
}
// display all task on the list
function displayTaskList(){
    todoListDOM.innerHTML = '';
    for(let i = 0; i < taskList.length; i++){
        let todoElement = document.createElement('div');
        todoElement.setAttribute('class', `todo-element`);
        todoElement.setAttribute('data-id', `${i}`);

        if(taskListCompleted.includes(taskList[i])){
            todoElement.innerHTML = `
            <div class="checkbox checked"><img src="images/icon-check.svg" alt=""></div> 
            <p> ${taskList[i]} </p>
            <div class="deleteTask"><img class='delete-icon' src="images/icon-cross.svg" alt=""></div>
            `
        }else{
            todoElement.innerHTML = `
            <div class="checkbox"></div> 
            <p> ${taskList[i]} </p>
            <div class="deleteTask"><img class='delete-icon' src="images/icon-cross.svg" alt=""></div>
            `
        }
        
        todoListDOM.appendChild(todoElement);
    }
}
// remove a task from the list
function removeTask(target){
    if(target.classList.contains('delete-icon')){
        if(confirm('Are you sure to delete this task?')){
            let elementTarget = target.parentElement.parentElement;
            let idElement = elementTarget.getAttribute('data-id')
            taskList.splice(idElement, 1);
            updateDisplay()
        }
    }
    // update local storage after remove a task
    localStorage.setItem('taskList', JSON.stringify(taskList));
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
}
////////// update display //////////
function updateDisplay(){
    noTaskMessage();
    if(taskList.length > 0){
        displayTaskList();
    }
    //refresh the array of task
    allTaskElement = document.querySelectorAll('.todo-element');
    //event click on element
    elementOnClick(allTaskElement);
    numberTaskLeft.innerHTML = taskList.length;
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

/* --- bottom buttons --- */ 
// clear completed tasks
clearComletedBtn.addEventListener('click', () => {
    taskList = taskList.filter((task) => {
        return !taskListCompleted.includes(task);
    });
    taskListCompleted = [];
    taskListBackUp = taskList;
    //update local storage after clearing the completed tasks
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateDisplay();
});
// disable filter to display all tasks, completed and active
allTaskBtn.addEventListener('click', () => {
    if(taskListBackUp.length > 0){
        taskList = taskListBackUp;
        updateDisplay();
    }
    updateDisplay();
});
// filter to display only active tasks
activeTaskBtn.addEventListener('click', () => {
    if(taskListBackUp.length > 0){
        taskList = taskListBackUp;
    }
    taskListBackUp = taskList;
    taskList = taskList.filter((task) => {
        return !taskListCompleted.includes(task);
    });
    updateDisplay();
});
// filter to display only completed tasks 
completedTaskBtn.addEventListener('click', () => {
    if(taskListBackUp.length > 0){
        taskList = taskListBackUp;
    }
    taskListBackUp = taskList;
    taskList = taskList.filter((task) => {
        return taskListCompleted.includes(task);
    });
    updateDisplay();
});


window.addEventListener('load', () => {
    updateDisplay();
});

btnClearStorage.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});