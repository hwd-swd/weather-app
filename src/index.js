import {fetchWeather,getInfo,updateInfo} from './modules/weather';
import { formDOM,dynamicWeather} from './modules/form';


let JSON = fetchWeather('san+jose').then(e=>{
    updateInfo(getInfo(e));
    dynamicWeather(getInfo(e));
})

formDOM()