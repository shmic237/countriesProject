import { getCountryByListOfCode, getCountryByName } from "./countryManagment.js";

const countryCuntent = document.querySelector('#countryCuntent');

export const createCauntryCard = (country) => {
    const { name, population, flags, continents } = country;

    let myDiv = document.createElement("div");
    countryCuntent.append(myDiv);
    myDiv.className = " col-lg-4 col-md-6 col-10 my-4 "
    myDiv.innerHTML = `
    <div class="card_of_home card mx-0" data-card-country="${name.common}" data-aos="zoom-in"data-aos-duration="1000">
        <img src=${flags.png} alt=${name.common}  style="height:200px; border-radius:8px;">
        <h3 id="name" class="text-center m-2">${name.common}</h3>
        <div class="overlay">
            <div class="text col-12 p-4">
                <h2 style="font-size: 45px;">${name.common} </h2>
                <h4>Region: <span style="font-weight: lighter;">${continents}</span></h4>
                <h4>Population: <span style="font-weight: lighter;">${population}</span></h4>
            </div>
        </div>             
    </div>
      
    
    `;
}


export const createCountryPage = (country) => {
    const { name, population, capital, flags, latlng, borders, languages, continents } = country;
    console.log(latlng);
    let myDiv = document.createElement("div");
    countryCuntent.append(myDiv);

    myDiv.className = "card_country_div card my-3 p-0 col-lg-10 col-md-12 col-10"
    myDiv.innerHTML = `
        <div class="card_country d-md-flex">
            <div class="col-md-6 col-12 pt-2 pe-md-0 pe-2 d-flex align-items-start d-md-block" id="details">
                <div class="ps-2 col-md-12 col-7"> 
                    <h2><strong>${name.common}</strong></h2>
                    <h4>Population: ${population}</h4>
                    <h4>Capital: ${capital[0]}</h4>
                    <h4>Region: ${continents}</h4>
                    <h4>Languages: ${Object.values(languages).join(",")}</h4>
                    <h4>Neighboring Countries:</h4>
                    <h4 class="d-flex flex-wrap" id="borderCountries">
                       
                    </h4>
                </div>
                <div class="flag col-md-10 col-5 mx-md-auto me-2 overflow-hidden shadow">
                    <img class="col-12" src="${flags.png}" alt="${name.common} flag">
                </div>
            </div>
            <div class="maps col-md-6 col-12 p-0 m-0 " >
                <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                        src="https://maps.google.com/maps?q=${latlng[0]},${latlng[1]}&z=6&ie=UTF8&iwloc=&output=embed">
                </iframe>
            </div>
        </div>
        
    `
    showBorderNames(borders);




}

const showBorderNames = async (borders) => {
    const borderCountriesContainer = document.querySelector("#borderCountries");
    const bordersStr = borders.join(',');
    const bordersNames = await getCountryByListOfCode(bordersStr, true);

    if (borders.length != 0) {
        borderCountriesContainer.innerHTML += bordersNames.map(border => {
            return `<a class="text-light m-1 borderCountry" data-border="${border.name.common}" href="#">${border.name.common}</a>`
        }).join('');
    }
    else {
        borderCountriesContainer.innerHTML += "No Borders"
    }


    const borderCountries = document.querySelectorAll("[data-border]");
    borderCountries.forEach(borderCountry => {
        borderCountry.addEventListener('click', async (event) => {
            event.preventDefault();
            const countryName = borderCountry.dataset.border;
            console.log(countryName);
            const listOfCountry = await getCountryByName(countryName);
            countryCuntent.innerHTML = "";
            createCountryPage(listOfCountry[0]);
        });
    });
}




