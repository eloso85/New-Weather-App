window.addEventListener('load', ()=>{
    let long;
    let lat;

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
            });
        });
        
      
    
        }

    
});