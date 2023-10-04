let submitBtn = document.querySelector('.submitBtn');
let inputEl = document.querySelector("#search-location");
let unitEl = document.querySelector(".unitBtn");
let current_city = null;
let celsiusPreference = true;

console.log(current_city);


unitEl.addEventListener('click', (e) => {
    e.preventDefault();
    switch (celsiusPreference) {
        case true:
            celsiusPreference = false;
            break;
        case false:
            celsiusPreference = true;
            break;
    }
    retrieveData(current_city);

})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    current_city = inputEl.value;
    retrieveData(current_city);
})

async function retrieveData(query) {
    console.log(query);
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=5776ef969eb249ad8f2101748230210&q=${query}`, { mode: 'cors' });
    if (!response.ok) {
        alert(`There was an error ${response.status}, try again.`)
    }
    else {
        let data = await response.json();
        let newData = processData(data);
        displayData(newData);
        reset();
    }
}

function processData(query) {
    let dataInfo = {
        condition: query.current.condition.text,
        city: query.location.name,
        country: query.location.country,
        temp_C: query.current.temp_c,
        temp_F: query.current.temp_f,
        roughTemp_C: query.current.feelslike_c,
        roughTemp_F: query.current.feelslike_f,
        windSpeed: Math.round(query.current.wind_kph),
        humidity: query.current.humidity,
    }
    return dataInfo;
}


function displayData(query) {
    document.querySelector('.condition').textContent = `${query.condition}`;
    document.querySelector('.location').textContent = `${query.city}, ${query.country}`;
    let span = document.querySelectorAll('.unit');
    switch (celsiusPreference) {
        case true:
            document.querySelector('.temperature').textContent = `${query.temp_C}`;
            document.querySelector('.rough-temp').textContent = `${query.roughTemp_C}`
            for (let i = 0; i < span.length; i++) {
                span[i].textContent = `°C`
            }
            break;
        case false:
            document.querySelector('.temperature').textContent = `${query.temp_F}`;
            document.querySelector('.rough-temp').textContent = `${query.roughTemp_F}`
            for (let i = 0; i < span.length; i++) {
                span[i].textContent = `°F`
            }
            break;

    }



}

function reset() {
    document.querySelector('form').reset();
}

export default retrieveData;