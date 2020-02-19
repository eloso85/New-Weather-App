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
        
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6d19623049abd3ae1e49417461fb8938`

            fetch (api)
            .then (response =>{
                return response.json();
            })
            .then (data =>{
                console.log(data)
                const {temp} = data.main;
                const {description} = data.weather;
                //set Dom Elements from api
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                console.log(description);
            });
        });
        
      
    
        }

    
});