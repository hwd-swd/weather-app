import {fetchWeather,getInfo,updateInfo} from './modules/weather';
import { formDOM } from './modules/form';


let JSON = fetchWeather('san+jose').then(e=>{
    updateInfo(getInfo(e))
})

formDOM()