
import { getMax, getMin } from "./tempMinMax.js";

import { testKey } from "../../key.mjs";


let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let fiveDay2 = document.querySelector('.five-day');

async function fetchWeather(api) {
    try {
        const response = await fetch(api);
        const data = await response.json();
        console.log(data);

        const { temp } = data.main;
        const weather = data.weather[0].description;
        const location = data.name;
        //set Dom Elements from api
        temperatureDegree.textContent = temp;
        temperatureDescription.textContent = weather;
        locationTimezone.textContent = location;
        //console.log(temp);
    } catch (error) {
        console.error(error);
    }
}

async function fetchFiveDayForecast(fiveDay) {
    try {
        const response = await fetch(fiveDay);
        const data = await response.json();

        const groupedData = data.list.reduce((days, row) => {
            const date = row.dt_txt.split(' ')[0];
            days[date] = [...(days[date] ? days[date] : []), row];
            return days;
        }, {});

        for (let date of Object.keys(groupedData)) {
            console.log('Date:', date);
            // current date -> date
            // original items array for this date -> groupedData[date]
            console.log('RowCount:', groupedData[date].length);
            console.log('MaxTemp:', getMax(groupedData[date], 'temp_max'));
            console.log('MinTemp:', getMin(groupedData[date], 'temp_min'));
            console.log('MaxHumidity:', getMax(groupedData[date], 'humidity'));

            console.log('\n\n');
        }


        // console.log(data.list);

        // const temp = data.list.map(response => `
        //     ${console.log(response.dt_txt)}
        // `);
        // fiveDay2.textContent = temp;
        // console.log(temp);

    } catch (error) {
        console.error(error);
    }
}

async function getGeoLocation() {
    if (navigator.geolocation) {
        try {
            navigator.geolocation.getCurrentPosition(async position => {
                const long = position.coords.longitude;
                const lat = position.coords.latitude;

                const apiKey =`${key}`;  // Replace with your API key
                console.log(process.env.API_KEY);
                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;
                const fiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;

                await fetchWeather(api);
                await fetchFiveDayForecast(fiveDay);
            });
        } catch (error) {
            console.error(error);
        }
    }
}

// Call the function to execute the logic
getGeoLocation();





const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);