import { useState, useEffect } from "react"
import countryService from "../services/countries"
import { Weather } from "./Weather"

export const Countries = ({filter}) => {
  const [countryList, setCountryList] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then((commonNames) => {
        setCountryList(commonNames)
      })
  }, [])

  useEffect(() => {
    setFilteredCountries(countryList
                            .filter(country => country
                                              .toLowerCase()
                                              .includes(filter.toLowerCase())))
  }, [countryList, filter]);   

  useEffect(() => {                     
    if (filteredCountries.length === 1) {
      countryService
        .getByName(filteredCountries[0])
        .then(country => {
          setSelectedCountry(country);
        })
        .catch(error => console.error(`Error al cargar ${filteredCountries[0]}`, error));
    }
    else if (selectedCountry != null && (!filteredCountries.includes(selectedCountry.name.common) || filteredCountries.length > 10)) {
      setSelectedCountry(null);
    }
  }, [filteredCountries]);

  const handleShowButton = (countryName) => {
    setFilteredCountries([countryName])
  }

  return (
    <>
      <div>
        {filteredCountries.length > 10 ?
          (<div>
            <p>...too many matches</p>
          </div>)

          : filteredCountries.length > 1 && filteredCountries.length < 10 ?
          (<div>
            {countryList
            .filter(country => country
                              .toLowerCase()
                              .includes(filter.toLowerCase()))
            .map(country => (
              <div key={country}>
                <span>{country} </span>
                <button onClick={() => handleShowButton(country)}>show</button>  
              </div>
            ))}
          </div>)
          : filteredCountries.length === 1 ?
          (<>
          </>)
          :
          (<div>
            <p>No coincidences</p>
          </div>)
        }
      </div>
      <div>
        {selectedCountry != null ?
          (<>
            <h1>{selectedCountry.name.common}</h1>
            <p>
              <span>capital: </span>
              <span>{selectedCountry.capital}</span>
            </p>
            <p>
              <span>area: </span>
              <span>{selectedCountry.area}</span>
            </p>
            <h3>languajes:</h3>
            <ul>
              {Object.keys(selectedCountry.languages).map((language) => (
                <li key={language}>
                  {selectedCountry.languages[language]}
                </li>
              ))}
            </ul>
            <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt}/>
            <Weather location={selectedCountry.name.common}/>
          </>)
          :
          (<>
          </>)
        }
      </div>
    </>
  )
}