import { useState, useEffect } from "react"
import weatherService from "../services/weather"

export const Weather = ({location}) => {
  const [locationName, setLocationName] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    setLocationName(location)
  },[location])

  useEffect(() => {
    if(locationName != null)
    {
      weatherService
      .getByName(locationName)
      .then((weather) => {
        if(weather != null)
        {
          setWeather(weather)
        }
      })
      .catch((error) => 
        console.error(`Error al cargar el tiempo de ${locationName}: `, error))
    }
  },[locationName])

  return (
    <>
      {weather != null ?
        (<div style={{marginTop: 30}}>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
          <p>{weather.weather[0].main}</p>
          <p>Temperatura: {(weather.main.temp - 273.15).toFixed(1)} ºC</p>
          <p>Viento: {weather.wind.speed} m/s</p>
        </div>)
      :
        (<>
        </>)
      }    
    </>
  )
}