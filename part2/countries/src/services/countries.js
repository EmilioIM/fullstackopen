import axios from "axios"
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  return axios
    .get(`${baseUrl}/all`)
    .then(response => {
      const {data} = response
      let commonNames = data.map(item => item.name.common)
      return commonNames
    })
    .catch(error => {throw error})
}

const getByName = (name) => {
  return axios
    .get(`${baseUrl}/name/${name}`)
    .then(response => {
      const {data} = response
      return data
    })
    .catch(error => {throw error})
}

// const create = newObject => {
//   return axios
//     .post(baseUrl, newObject)
//     .then(response => {
//       const {data} = response
//       return data
//     })
//     .catch(error => {throw error})
// }

// const update = (id, newObject) => {
//   return axios
//     .put(`${baseUrl}/${id}`, newObject)
//     .then(response => {
//       const {data} = response
//       return data
//     })
//     .catch(error => {throw error})
// }

// const deletePerson = (id) => {
//   return axios
//     .delete(`${baseUrl}/${id}`)
//     .then(response => {
//       console.log('acabo de borrar')
//       console.log(`${baseUrl}/${id}`)
//       const {data} = response
//       return data
//     })
//     .catch(error => {throw error})
// }

const countryService = {
  getAll,
  getByName,
};

export default countryService