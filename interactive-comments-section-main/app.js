/* ------------------------- DOM element selection ------------------------- */
let commentSection = document.querySelector('.comments-section');
let allCommentsData = {};


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

        commentary.appendChild(createInteractiveButton());
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
    };
}

// return an interactive score button
function createInteractiveButton(){
    let interactiveButton = document.createElement('div');
    interactiveButton.setAttribute('class', 'interactive-btn');
    interactiveButton.innerHTML = `
        <img class="icon-plus" src="images/icon-plus.svg" alt="Plus Icon">
        <span class="interactive-btn-number">12</span>
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
function getReplies(fullData){

    let repliesSection = document.createElement('div');
    repliesSection.setAttribute('class', 'replies-section');
    
    let reply = document.createElement('div');
    reply.setAttribute('class', 'reply-box');
    
    reply.appendChild(createInteractiveButton);   
    reply.innerHTML += `
        <div class="comment-text-section">
            <div class="comment-text-section-header">
                <img class="profile-pic" src="images/avatars/image-amyrobson.png" alt="profile">
                <p class="profile-name">amyrobson</p>
                <p class="time-posted">1 month ago</p>
            </div>
            <div class="comment-text">
                <span class="identification">@Martine</span> Impressive!  it seems the drag feature could improved. But overall it
                looks incredible. You've nailed the design and the responsiveness at various
                breakpoints works really well.
            </div>
        </div>
    `

    reply.appendChild(createReplyButton);          
}

/* ------------------------- EXECUTION ------------------------- */
(async ()=> {
    await getData();
    console.log(allCommentsData);
    displayComments(allCommentsData.comments);
})()