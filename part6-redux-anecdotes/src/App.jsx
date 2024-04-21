import { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'; // Asegúrate de importar AnecdoteForm
import AnecdoteForm from './components/AnecdoteForm'; // Asegúrate de importar AnecdoteForm
import Notification from './components/Notification'; // Asegúrate de importar AnecdoteForm
import Filter from './components/Filter';
import { initializeAnecdotes } from './features/anecdote/anecdoteSlice'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  })

  return (
    <>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App