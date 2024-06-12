/* ------------------------- DOM element selection ------------------------- */
let commentSection = document.querySelector('.comments-section');
let allCommentsData = {};
// buttons to display a box to add a new reply - fill in --EXECUTION-- part
let replyButtons = [];
// elements to get the new reply - fill in --EXECUTION-- part
let addNewReplyButton = null;
let newReplyText = null;
let replying = false;

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
        commentary.setAttribute('class', 'comment-box');

        commentary.appendChild(createInteractiveButton(fullData[i].score));
        commentary.innerHTML += `
        <div class="comment-box">
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

// get replies 
function getReplies(replies){

    let repliesSection = document.createElement('div');
    repliesSection.setAttribute('class', 'replies-section');


    for(let i = 0; i < replies.length; i++){
        let reply = document.createElement('div');
        reply.setAttribute('class', 'reply-box');
    
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
function displayReplySection(){
    let replyingBox = document.createElement('div');
    replyingBox.setAttribute('class', 'replying-box');

    replyingBox.innerHTML = `
    <img class="profile-pic" src="images/avatars/image-juliusomo.png" alt="profile pic">
        <textarea class="area-text" rows="4" cols="50"></textarea>
        <div class="replying-btn">
            REPLY
        </div>
    `;

    return replyingBox;
}

function deleteReplySection(){
    let replyingBox = document.querySelector('.replying-box');
    // if(){

    // }
    console.log(containsNode(replyingBox));
    //commentSection.removeChild(replyingBox);

    /*
    *
    *
    *   The delete function only work when replying a main comment
    *   and not for a reply
    * 
    * 
    * 
    */

    
}

// get data when adding a new reply and delete thes box
function getNewReply(reply){
    console.log(reply);
    deleteReplySection();
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
                addNewReplyButton = document.querySelector('.replying-btn');
                newReplyText = document.querySelector('.area-text');
                addNewReplyButton.addEventListener('click', () => {
                    getNewReply(newReplyText.value);
                    replying = false;
                })
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

// window.addEventListener('click', (e) => {
//     console.log(e.target);
// });