import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personService from './services/persons'
import './index'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [notification, setNotification] = useState(['',''])

  const addPerson = (event) => {
    event.preventDefault()
    let findedPerson = persons.find(p => p.name === newName)
    console.log({findedPerson});
    if(findedPerson !== undefined)
    {
      if(findedPerson.number === newNumber)
      {
        alert(`${newName} already exists in the phonebook`)
      }
      else{
        if (window.confirm(`${newName} is already in the phonebook, update the number?`)) {
          let updatedPerson = {name:findedPerson.name, number: newNumber}
          
          personService
            .update(findedPerson.id, updatedPerson)
            .then(data => {
              setNewName('')
              setNewNumber('')
              setPersons(prevPersons => prevPersons.map(p => {
                if(p.id === findedPerson.id){
                  return {...p, number : newNumber}
                }
                else{
                  return p
                }
              }))
              console.log('persons despues de actualizar:',{persons, updatedPerson, data})
              showNotification({message:`${findedPerson.name}'s number updated`, type:'success'})
            })
        }
      }
    }
    else
    {
      let newPerson = {name: newName, number: newNumber}
      
      personService
        .create(newPerson)
        .then(data => {
          setPersons(prevpersons => prevpersons.concat(data))
          setNewName('')
          setNewNumber('')
          console.log('persons despues de crear:',{persons, newPerson, data})
          showNotification({message:`${newPerson.name}'s added`, type:'success'})
      })
      .catch(error => {
        console.error('Error while creating:', error.message)
        showNotification({message:`An error ocurred trying to add ${newPerson.name}`, type:'error'})
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setFilter(event.target.value)
  }

  const handleDeleteClick = (id) => {
    let personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`delete ${personToDelete.name}?`)) {
      personService
      .deletePerson(id)
      .then(data => {
        console.log('despues de eliminar, antes del load:', {persons, id, data})
        loadPersons()
        console.log('despues de eliminar, despues del load:', {persons, id, data})
        showNotification({message:`${personToDelete.name} has been removed`, type:'success'})
      })
      .catch(error => {
        console.error('Error while deleting:', error.message)
        showNotification({message:`An error ocurred trying to remove ${personToDelete.name}`, type:'error'})
      })
    }  
  }

  const loadPersons = () => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
        console.log('getAll completado', {data});
      })
      .catch(error => {
        console.error('Error while fetching:', error.message)
        showNotification({message:`An error ocurred fetching the data`, type:'error'})
      })
  }

  const showNotification = ({message, type}) => {
    console.log('showNotification:',{message, type});
    setNotification({message, type})
    console.log('notification:',notification);
  }

  useEffect(() => {
    console.log('se ejecuta effect');
    loadPersons()
  },[])


  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleSearch={handleSearch} />

      <h2>Add Person</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} handleClick={handleDeleteClick}/>
    </div>
  )
}

export default App