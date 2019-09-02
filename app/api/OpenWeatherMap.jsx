import axios from 'axios';

// private variables
let x = 100;

// private consts
const OPEN_WEATHER_MAP_URL = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = "386e9ed7ecac1dba308ca1f2daf45401";

let urlCreator = function (cityName){
  let encodedCityName = encodeURIComponent(cityName);
  return OPEN_WEATHER_MAP_URL + "?appid=" + API_KEY + "&q=" + encodedCityName + ",tr&units=metric";
}

let getTemp = function(city){
  return axios.get(urlCreator(city)).then(function(response){
    if (response.data.cod && response.data.message){
      throw new Eror(response.data.message);
    } else {
      return response.data.main.temp;
    }
  }, function (err) {
    throw new Error(err.response.data.message);
  });
}

export default {
  GetTemp : getTemp
}
