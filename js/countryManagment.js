

const sendGeneralCountriesReq = async (routeData, queryString = "") => {
    const  baseUrl = "https://restcountries.com/v3.1/";
    const res = await fetch(`${baseUrl}${routeData}${queryString}`);
    const data = await res.json();
    return data;
}

export const getAllCountry = async () => {
    try {
        return sendGeneralCountriesReq("all", "?fields=name,continents,flags,maps,population,languages,latlng,capital,borders");
    } catch (error) {
        console.log(error);
    }
};

export const getCountryByListOfCode = async (listOfCodes,onlyName=false) => {
    try {
        let fields = onlyName?"name":"name,continents,flags,maps,population,languages,latlng,capital,borders";
        return sendGeneralCountriesReq("alpha", `?codes=${listOfCodes}&&fields=${fields}`);
    } catch (error) {
        console.log(error);
    }
};

export const getCountryByCode = async (countryCode) => {
    try {
        return sendGeneralCountriesReq("alpha", `?codes=${countryCode}`);
    } catch (error) {
        console.log(error);
    }
};

export const getCountrySearch = async (nameInput) => {
    try {
        return sendGeneralCountriesReq(`name/${nameInput}/`, "?fields=name,continents,flags,maps,population,languages,latlng,capital,borders");
    } catch (error) {
        console.log(error);
        alert("Sorry, the country was not found ")
    }

};

export const getCountryByName = async (nameInput) => {
    try {
        return sendGeneralCountriesReq(`name/${nameInput}/`, "?fields=name,continents,flags,maps,population,languages,latlng,capital,borders");

    } catch (error) {
        console.log(error);
        alert("Sorry, the country was not found ")
    }

};

