/* -------------------- DOM elements select -------------------- */
let body = document.querySelector('body');
let btnTheme = document.querySelector('.theme-toggle-section');
let iconTheme = document.querySelector('.fa-regular');

let cardSection = document.querySelector('.countries-section');
let allCards = null; // collected in createCardAndApplyData()

// details page DOM element
let btnBack = document.querySelector('.back-button-section');
let flag = document.querySelector('.flag-section img');

let countryName = document.querySelector('.details-country-name');
let nativeName = document.querySelector('.native-name');
let population = document.querySelector('.population');
let region = document.querySelector('.region');
let subRegion = document.querySelector('.sub-region');
let capital = document.querySelector('.capital');
let levelDomain = document.querySelector('.level-domain');
let currencies = document.querySelector('.currencies');
let languages = document.querySelector('.languages');



/* -------------------- VARIABLES INIT      -------------------- */
let isDarkTheme = false;

let selectedCountry = null;


/* ---------- Get data from local storage a onLoad ---------- */
window.addEventListener("load", () => {
    /* Load curent theme selected */
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
    /* Get data for the selected country */
    if(localStorage.getItem('selectedCountry') !== null){
        let selectedCountryStore = localStorage.getItem('selectedCountry');
        selectedCountry = JSON.parse(selectedCountryStore);
    
        flag.src = selectedCountry.flags.png;
        countryName.innerText = selectedCountry.name;
        nativeName.innerText = selectedCountry.nativeName;
        population.innerText = selectedCountry.population;
        region.innerText = selectedCountry.region;
        subRegion.innerText = selectedCountry.subregion;
        capital.innerText = selectedCountry.capital;
        levelDomain.innerText = selectedCountry.topLevelDomain[0];
        currencies.innerText = selectedCountry.currencies[0].name;
        languages.innerText = selectedCountry.languages[0].name;
    }
});


/* ---------------------------------------- all countries page ---------------------------------------- */
/* -------------------- FUNCTIONS           -------------------- */

if(window.location.href === 'http://127.0.0.1:5500/rest-countries-api-with-color-theme-switcher-master/index.html'){
async function createCardAndApplyData(){
    let fullData = {};
    await fetch('data.json')
    .then(response => response.json())
    .then(data => fullData = data);

    for(let i = 0; i < fullData.length; i++){
        let card = document.createElement('div');
        card.setAttribute('class', `card ${i}`);

        card.innerHTML = `
            <a href="detail-page.html">
                <img src="${fullData[i].flags.svg}" alt="flags">

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
        allCards = document.querySelectorAll('.card');
        collectCardData(allCards, fullData);
}
createCardAndApplyData();
}

// Collected all card and get data onClick to display on the details page
let newData = null;
function collectCardData(list, fullData){
    for(let i = 0; i < list.length; i++){
        list[i].addEventListener('click', () => {
            let classListCard = list[i].classList;
            newData = fullData[classListCard[1]];;

            localStorage.setItem('selectedCountry', JSON.stringify(newData));
        });
    }
}


/* -------------------- EVENTS             -------------------- */
// Home page
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

// Details page 
btnBack.addEventListener('click', () =>{
    localStorage.removeItem('selectedCountry');
});

flag.addEventListener('click', () => {
    console.log(newData);
});
