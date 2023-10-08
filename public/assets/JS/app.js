

let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let fiveDay2 = document.querySelector('.five-day');

async function getWeather() {
    if (navigator.geolocation) {
        try {
            navigator.geolocation.getCurrentPosition(async position => {
                const long = position.coords.longitude;
                const lat = position.coords.latitude;

                const apiKey =`6d19623049abd3ae1e49417461fb8938`;  // Replace with your API key
               
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

async function fetchWeather(api) {
    try {
        const response = await fetch(api);
        const data = await response.json();
        console.log(data.main);

        const  { ...temp }  = data.main;
        const weather = data.weather[0].description;
        const location = data.name;
        console.log(temp);
        temperatureDegree.textContent = temp.temp;
        temperatureDescription.textContent = weather;
        locationTimezone.textContent = location;
      
     
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


    

    } catch (error) {
        console.error(error);
    }
}

function getMax(arr, attr){
    return Math.max.apply(Math, arr.map(item => item.main[attr]));
  }
  
   function getMin(arr, attr){
    return Math.min.apply(Math, arr.map(item => item.main[attr]));
  }

  getWeather();
