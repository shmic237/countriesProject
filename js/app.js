import { getCountryByListOfCode, getCountryByName } from "./countryManagment.js";
import { declareEvents } from "./event.js"
import { createCauntryCard, createCountryPage } from "./countryClass.js";



export const init = async () => {
    const listOfCountry = await getCountryByListOfCode("IL,USA,TH,FR,GBR,AUT");
    listOfCountry.map(item => createCauntryCard(item));
    const cardOfHome = document.querySelectorAll(".card_of_home");
    cardOfHome.forEach((card) =>{
        card.addEventListener("click", showFullPage)
    })

    
}

export const showFullPage = async (e) => {
    const country = e.currentTarget.dataset.cardCountry;
    const countryData = await getCountryByName(country);
    const countryCuntent = document.querySelector("#countryCuntent")
    countryCuntent.innerHTML = "";
    createCountryPage(countryData[0]);
}

init()
declareEvents()














