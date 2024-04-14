import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    clear
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getResources = useCallback(async () => {
    try {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [baseUrl, setResources])

  useEffect(() => {
    getResources()
  },[getResources])

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)
      await getResources()
      return response.data
    } catch (error) {
      console.error(error)
    }     
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const { clear : contentClear, ...content } = useField('text')
  const { clear : nameClear, ...name } = useField('text')
  const { clear : numberClear, ...number } = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    contentClear()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    nameClear()
    numberClear()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button type='submit'>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button type='submit'>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App