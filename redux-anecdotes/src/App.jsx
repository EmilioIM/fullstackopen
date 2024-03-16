import { useSelector, useDispatch } from 'react-redux'
import { increment } from './features/counter/counterSlice';

const App = () => {
  const anecdotes = useSelector(state => state.counter)
  const dispatch = useDispatch()
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(increment(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App