import {fetchWeather,getInfo, updateInfo} from './weather';

function formDOM(){
    const submit = document.querySelector('#submit');
    submit.addEventListener('click',inputCity);
};

async function inputCity(){
    const input = document.querySelector('#input').value;
    let ans = await fetchWeather(formatCity(input)).then(e=>updateInfo(getInfo(e)));
    // console.log(ans)
    // if (!ans){
    //     displayError()
    //     return false
    // }
    // else{
    //     return true
    // }
}



function formatCity(city){
    return city.split(' ').join('+');
}

function displayError(){
    console.log('error')
}

export {formDOM}