import axios from 'axios'
//const baseUrl = 'https://localhost:3001/api/persons'
const baseUrl = 'https://api-part3.fly.dev/api/persons'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => {
      const {data} = response
      return data
    })
    .catch(error => {throw error})
}

const create = newObject => {
  return axios
    .post(baseUrl, newObject)
    .then(response => {
      const {data} = response
      return data
    })
    .catch(error => {throw error})
}

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then(response => {
      const {data} = response
      return data
    })
    .catch(error => {throw error})
}

const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(response => {
      console.log('acabo de borrar')
      console.log(`${baseUrl}/${id}`)
      const {data} = response
      return data
    })
    .catch(error => {throw error})
}

const personService = {
  getAll,
  create,
  update,
  deletePerson,
};

export default personService