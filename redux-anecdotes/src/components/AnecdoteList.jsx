import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../features/counter/counterSlice';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.counter)
  const dispatch = useDispatch()

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes); // Tambien podemos hacerlo en el useSelector

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
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnecdoteList;
