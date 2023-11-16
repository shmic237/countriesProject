
import { getCountryByName, getCountryByListOfCode, getCountrySearch, getAllCountry, getCountryByCode } from "./countryManagment.js"
import { createCountryPage, createCauntryCard } from "./countryClass.js"
import { init, showFullPage  } from "./app.js";


export const declareEvents = () => {

    const id_atlas = document.querySelector("#id_atlas")
    const countryCuntent = document.querySelector("#countryCuntent")
    const btn_search = document.querySelector("#btn_search");
    const all_country = document.querySelector("#all");
    const countryLinks = document.querySelectorAll("[data-country]");


    countryLinks.forEach(country => {
        country.addEventListener("click", async () => {
            countryCuntent.innerHTML = "";
            const countryData = await getCountryByName(country.dataset.country);
            if (countryData[0].status != 404) {
                createCountryPage(countryData[0]);
            }
        })
    })


    all_country.addEventListener("click", async () => {
        countryCuntent.innerHTML = "";
        const countryData = await getAllCountry();
        countryData.forEach(country => {
            createCauntryCard(country);
        })
        const cardHome = document.querySelectorAll(".card_of_home");
        cardHome.forEach((card) => {
            card.addEventListener("click", showFullPage)
        })
    })

    id_atlas.addEventListener("click", () => {
        countryCuntent.innerHTML = "";
        init();
    })


    btn_search.addEventListener("click", async (event) => {
        event.preventDefault()
        const nameInput = document.querySelector("#searchInput").value;
        countryCuntent.innerHTML = "";
        const countryData = await getCountrySearch(nameInput);
        if (countryData[0].status != 404) {
            createCountryPage(countryData[0]);
        }
    })


}

