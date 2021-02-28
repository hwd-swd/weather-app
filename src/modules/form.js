import {fetchWeather,getInfo, updateInfo} from './weather';

function formDOM(){
    const submit = document.querySelector('#submit');
    submit.addEventListener('click',inputCity);

    const input = document.querySelector('#input');
    input.addEventListener('keyup',e=>{
        
        if(e.keyCode===13){
            inputCity()
        }
    })
};

async function inputCity(){
    const input = document.querySelector('#input').value;
    
    if(input!=''){
        
        let ans = await fetchWeather(formatCity(input))
        .then(e=>{
            fullDOM(e)
        })
        .catch();

        
    }
}

function fullDOM(e){
    updateInfo(getInfo(e));
    dynamicWeather(getInfo(e));
    clearForm();
}

function clearForm(){
    const inputError = document.querySelector('#error');
    inputError.textContent = ''; 
    inputError.className = 'error'; 
    document.querySelector('#input').value='';
}

function dynamicWeather(ans){
    const main = document.querySelector('.main');
    switch(ans['weather']){
        case 'Rain':
            main.style.backgroundImage = `url('./imgs/rain.jpg')`;
            break;
        case 'Clouds':
            main.style.backgroundImage = `url('./imgs/cloudy.jpg')`
            break
        case 'Clear':
            main.style.backgroundImage = `url('./imgs/sunny.jpg')`
            break;
        case 'Snow':
            main.style.backgroundImage = `url('./imgs/snow.jpg')`
            break;
        case 'Haze':
            main.style.backgroundImage = `url('./imgs/haze.jpg')`
            break;
        case 'Mist':
            main.style.backgroundImage = `url('./imgs/mist.jpg')`
            break;
        case 'Smoke':
            main.style.backgroundImage = `url('./imgs/smoke.jpg')`
            break;
    }

};

function formatCity(city){
    return city.split(' ').join('+');
}

function displayError(){
    const inputError = document.querySelector('#error');
    inputError.textContent = `No matching location found!`;
    inputError.className = 'error active';
}

export {formDOM, displayError,dynamicWeather}