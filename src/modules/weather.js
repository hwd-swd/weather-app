async function fetchWeather(cityName){
    try{
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=bd02432f77556bedd13769e0dd339369`);
        
        // let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=bd02432f77556bedd13769e0dd339369`);
        let responseJSON = await response.json();
        if(responseJSON.main!=undefined){
            console.log(responseJSON)
            return responseJSON
        }
        else{
            return false
        }
    }catch(err){
        alert(err)
        return false
    }
};

function getInfo(responseJSON){
    let ans = {};
    ans['weather']=responseJSON.weather[0].main;
    ans['city']=responseJSON.name;
    ans['country']=responseJSON.sys.country;
    ans['temperature']=responseJSON.main.temp;
    ans['feels-like']=responseJSON.main.feels_like;
    ans['humidity']=responseJSON.main.humidity;
    ans['wind-speed']=responseJSON.wind.speed;
    ans['wind_direction']=responseJSON.wind.deg;
    console.log(ans)
    return ans
}


function formatTemperature(ans,temperature){
    if(ans['country']=='US'){
        const string = convertKtoF(temperature).toString();
        return `${string}<sup><span>&#8457;</span></sup>`;
    }
    else{
        const string = convertKtoC(temperature).toString();
        return `${string}<sup><span>&#8451;</span></sup>`;
    }
}

function convertKtoF(kelvin){
    return Math.round(((parseFloat(kelvin)-273.15)*(9/5)+32)*10)/10;
};

function convertKtoC(kelvin){
    return Math.round((parseFloat(kelvin)-273.15)*10)/10;
};

function converttoMPH(metric){
    return Math.round(parseFloat(metric)*2.23694*10)/10;
}

function converttoKPH(metric){
    return Math.round(parseFloat(metric)*36)/10;
}

function formatWind(ans,speed){
    if(ans['country']=='US'){
        const string = converttoMPH(speed).toString();
        return `${string} mph`;
    }
    else{
        const string = converttoKPH(speed).toString();
        return `${string} km/h`;
    }
}

function windDirection(degrees){
    const icon = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add('fa-arrow-right');
    const windDirection = document.getElementById('wind-direction');
    windDirection.innerHTML=''
    windDirection.style.transform = `rotate(${degrees}deg)`;
    windDirection.appendChild(icon);
}


function updateInfo(ans){
    const weather = document.getElementById('weather');
    const location = document.getElementById('location');
    const temperature = document.getElementById('temp');
    const feels_like = document.getElementById('feels-like');
    const wind_speed = document.getElementById('wind-speed');
    const humidity = document.getElementById('humidity');

    weather.textContent = ans['weather'];
    location.textContent = ans['city'] + ', ' + ans['country'];
    
    temperature.innerHTML = formatTemperature(ans,ans['temperature']);
    feels_like.innerHTML = 'Feels Like: ' + formatTemperature(ans,ans['feels-like']);
    wind_speed.textContent = formatWind(ans,ans['wind-speed']);
    windDirection(ans['wind_direction'])

    humidity.textContent = 'Humidity: ' + ans['humidity']+ ' %';
}

export {fetchWeather,getInfo,updateInfo}