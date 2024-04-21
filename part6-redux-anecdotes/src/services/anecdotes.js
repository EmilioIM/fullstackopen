import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (content) => {
  const anecdote = {content, id: getId(), votes: 0}
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const vote = async (id) => {
  const anecdoteToUpdate = await getById(id)
  anecdoteToUpdate.votes += 1
  const response = await axios.put(`${baseUrl}/${id}`, anecdoteToUpdate);
  return response.data;
};

export default { getAll, create, vote }