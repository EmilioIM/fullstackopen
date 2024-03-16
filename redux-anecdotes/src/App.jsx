import { useState } from 'react'; // Importa useState
import { useSelector, useDispatch } from 'react-redux'
import { vote, create } from './features/counter/counterSlice';

const App = () => {
  const anecdotes = useSelector(state => state.counter)
  const dispatch = useDispatch()

  // Usa useState para manejar el estado del input
  const [newAnecdote, setNewAnecdote] = useState('');

  // Maneja el cambio del input
  const handleInputChange = (e) => {
    setNewAnecdote(e.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    dispatch(create(newAnecdote));
    setNewAnecdote(''); // Limpia el input después de crear la anécdota
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input value={newAnecdote} onChange={handleInputChange}/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default App