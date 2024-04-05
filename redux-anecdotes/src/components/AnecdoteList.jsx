import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../features/anecdote/anecdoteSlice';
import { showNotification, clearNotification } from '../features/anecdote/notificationSlice';


const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  
  const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes); // Tambien podemos hacerlo en el useSelector
  
  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(showNotification('voted "' + anecdote.content + '"'))
    setTimeout(() => dispatch(clearNotification()), 5000);
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnecdoteList;
