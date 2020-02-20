window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude
        
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=6d19623049abd3ae1e49417461fb8938`

            fetch (api)
            .then (response =>{
                return response.json();
            })
            .then (data =>{
                console.log(data)
                // $(".temperature-description").html(`
                // ${data.weather[0].map(function(player){
                //     return`
                //     ${data.main}
                //     `
                // }).join('')}
                // `)
                const temp = data.main;
                const weather = data.weather[0].main;
                const location = data.name;
                //set Dom Elements from api
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = weather;
                locationTimezone.textContent = location;
                console.log(temp);
            });
        });
        
      
    
        }

    
});