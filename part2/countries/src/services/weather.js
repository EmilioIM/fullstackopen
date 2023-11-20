import axios from "axios"
const baseUrlWeather = 'https://api.openweathermap.org/data/2.5/weather?q='
const api_key = process.env.REACT_APP_API_KEY // insert API key in .env.example and rename that file to .env

const getByName = (location) => {
  if(location != null)
  {
    return axios
      .get(`${baseUrlWeather}${location}&appid=${api_key}`)
      .then(response => {
        const {data} = response
        return data
      })
      .catch(error => {      
        throw error
      })
  }
  else{
    return null
  }
}

const weatherService = {
  getByName,
};

export default weatherService