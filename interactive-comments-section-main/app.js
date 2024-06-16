/* ------------------------- DOM element selection ------------------------- */
let commentSection = document.querySelector('.comments-section');
let allCommentsData = {};
// buttons to display a box to add a new reply - fill in --EXECUTION-- part
let replyButtons = [];
// elements to get the new reply - fill in --EXECUTION-- part
let addNewReplyButton = null;
let newReplyText = null;
let replying = false;
// interactive button - fill in --EXECUTION-- part
let plusIcons = [];
let minusIcons = [];
let scoreDisplays = [];
// delete and edit icon for your replies
let deleteIcon = null;
let editIcon = null;

/* ------------------------- FUNCTIONS ------------------------- */
// Get data from JSON file
async function getData(){
    const response = await fetch('./data.json');
    const data = await response.json();
    allCommentsData = data;
    return data;
}
// display the comments
function displayComments(fullData){
    for(let i = 0; i < fullData.length; i++){
        let commentary = document.createElement('div');
        commentary.setAttribute('class', `comment-box ${fullData[i].user.username}`);

        commentary.appendChild(createInteractiveButton(fullData[i].score));
        commentary.innerHTML += `
            <div class="comment-text-section">
                <div class="comment-text-section-header">
                    <img class="profile-pic" src="${fullData[i].user.image.png}" alt="profile">
                    <p class="profile-name">${fullData[i].user.username}</p>
                    <p class="time-posted">${fullData[i].createdAt}</p>
                </div>
                <div class="comment-text">
                ${fullData[i].content}
                </div>
            </div>
        `;
        commentary.appendChild(createReplyButton());
        
        commentSection.appendChild(commentary);
        commentSection.appendChild(getReplies(fullData[i].replies));
    };
}

// return an interactive score button
function createInteractiveButton(score){
    let interactiveButton = document.createElement('div');
    interactiveButton.setAttribute('class', 'interactive-btn');
    interactiveButton.innerHTML = `
        <img class="icon-plus" src="images/icon-plus.svg" alt="Plus Icon">
        <span class="interactive-btn-number">${score}</span>
        <img class="icon-minus" src="images/icon-minus.svg" alt="Minus Icon">
    `;

    return interactiveButton;
}
// return a reply button
function createReplyButton(){
    let replyButton = document.createElement('div');
    replyButton.setAttribute('class', 'reply-btn');
    replyButton.innerHTML = `
        <img class="icon-reply" src="images/icon-reply.svg" alt="Reply icon">
        Reply
    `;

    return replyButton;
}

// get and display all replies 
function getReplies(replies){

    let repliesSection = document.createElement('div');
    repliesSection.setAttribute('class', 'replies-section');


    for(let i = 0; i < replies.length; i++){
        let reply = document.createElement('div');
        reply.setAttribute('class', `reply-box ${replies[i].user.username}`);
    
        reply.appendChild(createInteractiveButton(replies[i].score));   
        reply.innerHTML += `
            <div class="comment-text-section">
                <div class="comment-text-section-header">
                    <img class="profile-pic" src="${replies[i].user.image.png}" alt="profile">
                    <p class="profile-name">${replies[i].user.username}</p>
                    <p class="time-posted">${replies[i].createdAt}</p>
                </div>
                <div class="comment-text">
                    <span class="identification">@${replies[i].replyingTo}</span> ${replies[i].content}
                </div>
            </div>
        `;
        reply.appendChild(createReplyButton()); 
        repliesSection.appendChild(reply);
    }

    return repliesSection;
}

// section to add a reply
function displayReplySection(reply){
    let replyingBox = document.createElement('div');
    replyingBox.setAttribute('class', 'replying-box');

    replyingBox.innerHTML = `
    <img class="profile-pic" src="images/avatars/image-juliusomo.png" alt="profile pic">
        <textarea class="area-text" rows="4" cols="50">${reply === undefined ? '' : reply}</textarea>
        <div class="replying-btn">
            REPLY
        </div>
    `;

    return replyingBox;
}

// add a new reply, input by user
function addNewReply(inputReply, currentCommentreplying, currentUser, userThatYouReply, editing){
    let repliesSection = document.createElement('div');
    repliesSection.setAttribute('class', 'replies-section');

    let reply = document.createElement('div');
    reply.setAttribute('class', `reply-box ${userThatYouReply}`);

    reply.appendChild(createInteractiveButton(0));   
    reply.innerHTML += `
        ${editing ? '' : '<div class="comment-text-section">'}
            <div class="comment-text-section-header">
                <img class="profile-pic" src="${currentUser.image.png}" alt="profile">
                <p class="profile-name">${currentUser.username}</p>
                <p class="time-posted">1 minute ago</p>
            </div>
            <div class="comment-text">
                <span class="identification">@${userThatYouReply}</span> ${inputReply}
            </div>

            <div class="edit-buttons">
                <div class="delete-btn">
                    <img src="images/icon-delete.svg" />
                    Delete
                </div>
                <div class="edit-btn">
                    <img src="images/icon-edit.svg" />
                    Edit
                </div>
            </div>
        ${editing ? '' : '<div>'}
    `;
    repliesSection.appendChild(reply)
    
    currentCommentreplying.after(repliesSection);
    return editing = false;
}

// get data when adding a new reply and delete thes box
function newReplyAction(reply, replyingBox, currentUser, userThatYouReply){
    if(reply !== ''){
        addNewReply(reply, replyingBox, currentUser, userThatYouReply);
    }
    // remove the current replying box after adding the new reply
    replyingBox.remove();

    if(reply !== ''){
        // delete a reply
        deleteIcon = document.querySelector('.delete-btn');
        deleteIcon.addEventListener('click', (e) => {
            let targetClass = e.target.parentElement.parentElement.parentElement.classList[0];
            let target = e.target.parentElement.parentElement.parentElement;
            let target2 = e.target.parentElement.parentElement.parentElement.parentElement;
           
            if(targetClass === 'reply-box'){
                deleteReply(target);
            }else if(targetClass === 'comment-text-section'){
                deleteReply(target2);
            }
        });

        // edit a reply
        editIcon = document.querySelector('.edit-btn');
        editIcon.addEventListener('click', (e) => {
            let targetClass = e.target.parentElement.parentElement.parentElement.classList[0];
            let target = e.target.parentElement.parentElement.parentElement;
            let target2 = e.target.parentElement.parentElement.parentElement.parentElement;

             if(targetClass === 'reply-box'){
                editReply(target, reply);
            }else if(targetClass === 'comment-text-section'){
                editReply(target2, reply);
            }
        });
    }

    // interactive button to upvote and downvote a comment or reply
    interactiveButtonAction();
}

// delete one of your replies
function deleteReply(reply){
    reply.remove();
}

// edit a reply
function editReply(replyBoxToEdit, reply){
    let editing = true;

    replyBoxToEdit.after(displayReplySection(reply));
    replyBoxToEdit.remove();
    // add the edit reply
    addNewReplyButton = document.querySelector('.replying-btn');
    newReplyText = document.querySelector('.area-text');
    addNewReplyButton.addEventListener('click', (e) => {
        let userThatYouReply = e.target.parentElement.parentElement.previousSibling.classList[1];
        let currentReplyingBox = e.target.parentElement;
        let currentUser = allCommentsData.currentUser;
        addNewReply(newReplyText.value, currentReplyingBox, currentUser, userThatYouReply, editing);
        currentReplyingBox.remove();
        replying = false;
    })
}

// interactive button to upvote and downvote a comment or reply
function interactiveButtonAction(){
    plusIcons = document.querySelectorAll('.icon-plus');
    minusIcons = document.querySelectorAll('.icon-minus');
    scoreDisplays = document.querySelectorAll('.interactive-btn-number');

    for(let i = 0; i < plusIcons.length; i++){
        let currentScore = scoreDisplays[i].innerHTML;
        plusIcons[i].addEventListener('click', (e) => {
            scoreDisplays[i].innerHTML = Number(currentScore) + 1;
        });
        minusIcons[i].addEventListener('click', () => {
            if(currentScore > 0){
                scoreDisplays[i].innerHTML = Number(currentScore) - 1
            }
        });
    }
}

function addReplyAction(){
    addNewReplyButton = document.querySelector('.replying-btn');
    newReplyText = document.querySelector('.area-text');
    addNewReplyButton.addEventListener('click', (e) => {
        let userThatYouReply = e.target.parentElement.previousSibling.classList[1];
        let currentReplyingBox = e.target.parentElement;
        let currentUser = allCommentsData.currentUser;
        newReplyAction(newReplyText.value, currentReplyingBox, currentUser, userThatYouReply);
        replying = false;
    })
}

/* ------------------------- EXECUTION ------------------------- */
(async ()=> {
    await getData();
    // display comments and replies
    displayComments(allCommentsData.comments);
    // get all reply button, and display a reply section onClick
    replyButtons = document.querySelectorAll('.reply-btn');
    for(let i = 0; i < replyButtons.length; i++){
        replyButtons[i].addEventListener('click', (e) => {
            if(!replying){
                replying = true;
                let commentTarget = e.target.parentElement;
                commentTarget.after(displayReplySection());

                // add new reply
                addReplyAction();
            }

        });
    }
    
})();

/* ------------------------- EVENTS ------------------------- */
for(let i = 0; i < replyButtons.length; i++){
    replyButtons[i].addEventListener('click', () => {
        console.log('yes');
    });
}
