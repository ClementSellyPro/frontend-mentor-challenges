/* -------------------- DOM elements select -------------------- */
// home page
let body = document.querySelector('body');
let btnTheme = document.querySelector('.theme-toggle-section');
let iconTheme = document.querySelector('.fa-regular');

let cardSection = document.querySelector('.countries-section');
let allCards = null; // collected in createCardAndApplyData()

let input = document.querySelector('.user-input');
let continentFilter = document.getElementById('country-select');

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

let borderCountries = document.querySelector('.border-countries');


/* -------------------- VARIABLES INIT      -------------------- */
let isDarkTheme = false;

let selectedCountry = null;


/* ---------- Get data from local storage a onLoad for the details page ---------- */
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

        // complete all informations for the selected cuontry
        flag.src = selectedCountry.flags.png;
        countryName.innerText = selectedCountry.name;
        nativeName.innerText = selectedCountry.nativeName;
        population.innerText = selectedCountry.population;
        region.innerText = selectedCountry.region;
        subRegion.innerText = selectedCountry.subregion;
        capital.innerText = selectedCountry.capital;
        levelDomain.innerText = selectedCountry.topLevelDomain[0];
        currencies.innerText = selectedCountry.currencies[0].name;
        // reach all languages
        if(selectedCountry.languages.length > 1){
            for(let i = 0; i < selectedCountry.languages.length; i++){
                if(i === 0){
                    languages.innerText = selectedCountry.languages[i].name;
                }else{
                    languages.innerText += `, ${selectedCountry.languages[i].name}`;
                }
            }
        }else{
            languages.innerText = selectedCountry.languages[0].name;
        }
        // looking for all border countries 
        let allBorderCountries = '';
        for(let i = 0; i < selectedCountry.borders.length; i++){
            allBorderCountries += `<div class="border-country">${selectedCountry.borders[i]}</div>`;
        }
        console.log(allBorderCountries);
        borderCountries.innerHTML = allBorderCountries;
    }
});


/* ---------------------------------------- all countries page ---------------------------------------- */
/* -------------------- FUNCTIONS           -------------------- */

if(window.location.href === 'http://127.0.0.1:5500/rest-countries-api-with-color-theme-switcher-master/index.html'){
let userInput = ''; 
let continentSelected = '';
async function createCardAndApplyData(input, continent){
    let fullData = {};
    await fetch('data.json')
    .then(response => response.json())
    .then(data => fullData = data);

    // filter by user input
    let dataToDisplay = fullData;
    if(input != undefined){
        dataToDisplay = filterCountries(fullData, input);
    }

    //filter by continent selection
    if(continent != undefined){
        filterCountriesByContinent(fullData, continent);
    }
    
    // reset before display all Data or filter data 
    cardSection.innerHTML = '';
    for(let i = 0; i < dataToDisplay.length; i++){
        let card = document.createElement('div');
        card.setAttribute('class', `card ${i}`);
        
        card.innerHTML = `
            <a href="detail-page.html">
                <img src="${dataToDisplay[i].flags.svg}" alt="flags">

                <div class="country-description">
                    <h2>${dataToDisplay[i].name}</h2>
                    <p><span class="country-description-detail">Population:</span> ${dataToDisplay[i].population}</p>
                    <p><span class="country-description-detail">Region:</span> ${dataToDisplay[i].region}</p>
                    <p><span class="country-description-detail">Capital:</span> ${dataToDisplay[i].capital}</p>
                </div>
            </a>
        `;
        cardSection.appendChild(card);
    }
        allCards = document.querySelectorAll('.card');
        collectCardData(allCards, fullData);
}
createCardAndApplyData(userInput);
    
    // get input user
    input.addEventListener('change', (e) => {
        userInput = e.target.value;
        createCardAndApplyData(userInput);
    });
    // get continent selected
    continentFilter.addEventListener('change', (e) => {
        continentSelected = e.target.value;
        createCardAndApplyData(continentSelected);
    });
}

// filter the cards according the input
function filterCountries(rawData, input){
    return rawData.filter(data => data.name.toLowerCase().includes(input));
}

function filterCountriesByContinent(rawData,continent){
    return rawData.filter(data => data.region == continent);
} 


// Collected all card and get data onClick to display on the details page
let newData = null;
function collectCardData(list, fullData){
    for(let i = 0; i < list.length; i++){
        list[i].addEventListener('click', () => {
            let classListCard = list[i].classList;
            newData = fullData[classListCard[1]];

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
