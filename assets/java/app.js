window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let fiveDay2 = document.querySelector('.five-day');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude
        
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=6d19623049abd3ae1e49417461fb8938`
            const fiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&appid=6d19623049abd3ae1e49417461fb8938`
            fetch (api)
            .then (response =>{
                return response.json();
            })
            .then (data =>{
                console.log(data)
                
               
                const {temp} = data.main;
                const weather = data.weather[0].description;
                const location = data.name;
                //set Dom Elements from api
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = weather;
                locationTimezone.textContent = location;
                //console.log(temp);
            });
            fetch (fiveDay)
            .then (response =>{
                return response.json();
            })
            .then (data2 =>{
                const temp = data2.list.map(function(response){
                    return  `
                                      ${response[0].dt_txt}${response.main.temp}
                     
                    
                    
                    `})
                fiveDay2.textContent = temp
                console.log(data2)
                console.log(temp)
                
               
            }); 
        });
        
      
    
        }

    
});