/* -------------------- DOM elements select -------------------- */
let body = document.querySelector('body');
let btnTheme = document.querySelector('.theme-toggle-section');
let iconTheme = document.querySelector('.fa-regular');

let cardSection = document.querySelector('.countries-section');



/* -------------------- VARIABLES INIT      -------------------- */
let isDarkTheme = false;




/* Load curent theme selected */
window.addEventListener("load", () => {
    let currentTheme = localStorage.getItem("isDark");
    isDarkTheme = currentTheme;
    if(isDarkTheme === true){
        body.classList.add('dark');
    }else{
        if(body.classList.contains('dark')){
            body.classList.remove('dark');
        }
    }
    console.log(`isdarktheme in load :  ${isDarkTheme}`);
});



/* -------------------- FUNCTIONS           -------------------- */
// async function getData(){
//     await fetch('data.json')
//     .then(response => response.json())
//     .then(data => data);
// }

async function createCardAndApplyData(){
    let fullData = {};
    await fetch('data.json')
    .then(response => response.json())
    .then(data => fullData = data);

    // let data = getData();
    console.log(fullData);

    for(let i = 0; i < fullData.length; i++){
        let card = document.createElement('div');
        card.setAttribute('class', 'card');

        card.innerHTML = `
            <a href="detail-page.html">
                <img src="${fullData[i].flags.svg}" alt="">

                <div class="country-description">
                    <h2>${fullData[i].name}</h2>
                    <p><span class="country-description-detail">Population:</span> ${fullData[i].population}</p>
                    <p><span class="country-description-detail">Region:</span> ${fullData[i].region}</p>
                    <p><span class="country-description-detail">Capital:</span> ${fullData[i].capital}</p>
                </div>
            </a>
        `;
        cardSection.appendChild(card);
    }
}


createCardAndApplyData();



/* -------------------- EVENTS             -------------------- */
btnTheme.addEventListener('click', () => {
    console.log(`isdartheme in click :  ${isDarkTheme}`);
    if(body.classList.contains('dark')){
        isDarkTheme = false;
        body.classList.remove('dark');
        iconTheme.classList.remove('fa-sun');
        iconTheme.classList.add('fa-moon');
    }else{
        isDarkTheme = true;
        body.classList.add('dark');
        iconTheme.classList.remove('fa-moon');
        iconTheme.classList.add('fa-sun');
    }
    localStorage.setItem("isDark", isDarkTheme);
});
