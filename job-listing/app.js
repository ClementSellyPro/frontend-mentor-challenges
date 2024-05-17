/* --------------- DOM selection --------------- */ 
let jobListDOM = document.querySelector('.job-list');


/* --------------- Function --------------- */ 
// get data from JSON file with fetch
const getData = async () => {
    let result;
    await fetch('data.json')
    .then(response => response.json())
    .then(data => result = data)
    return result;
}
// loop languages required
function getLanguages(languages){
    let result = [];
    for(let i = 0; i < languages.length; i++){
        result.push(languages[i]);
    }
    return result;
}
// loop tools required
function getTools(tool){
    let result = [];
    for(let i = 0; i < tool.length; i++){
        result.push(tool[i]);
    }
    return result;
}
// Display all available jobs
function displayElement(data){
    for(let i = 0; i < data.length; i++){
        let languages = getLanguages(data[i].languages);
        let tools = getTools(data[i].tools);
        let element = document.createElement('div');
        element.setAttribute('class', 'element');

        element.innerHTML = `
        <div class="left-section">
            <div class="logo-img">
            <img src="${data[i].logo}" alt="logo image">
            </div>

            <div class="details">
            <div class="details-company">
                <h2 class="company-name">${data[i].company}</h2>
                <div class="tag-news ${(data[i].postedAt !== "1d ago" && (data[i].postedAt !== "2d ago"))? 'hide' : ''}">New!</div>
            </div>
            <div class="details-job-title">
                <h1 class="job-title">${data[i].position}</h1>
            </div>
            <div class="details-job">
                <span>${data[i].postedAt}</span><span>${data[i].contract}</span><span>${data[i].location}</span>
            </div>
            </div>
        </div>
        `;
        // adding tag list 
        let tagList = document.createElement('div');
        tagList.setAttribute('class', 'tags-list');
        tagList.innerHTML = `
            <div class="tag-element">${data[i].role}</div>
            <div class="tag-element">${data[i].level}</div>
        `;
        // adding languages required
        for(let j = 0; j < languages.length; j++){
            let tagElement = document.createElement('div');
            tagElement.setAttribute('class', 'tag-element');
            tagElement.innerHTML = languages[j];
            tagList.appendChild(tagElement);
        }
        // adding tools required
        for(let j = 0; j < tools.length; j++){
            let tagElement = document.createElement('div');
            tagElement.setAttribute('class', 'tag-element');
            tagElement.innerHTML = tools[j];
            tagList.appendChild(tagElement);
        }
        element.appendChild(tagList);
        jobListDOM.appendChild(element);
    }
}


/* --------------- Execution --------------- */ 
(async () => {
    let allData = await getData();
    displayElement(allData)
})();
