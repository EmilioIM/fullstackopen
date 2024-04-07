import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './services/requests'
import { useNotification } from './components/NotificationContext';

const App = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })
  
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  else if (result.isError)
  {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    anecdote.votes ++
    updateAnecdoteMutation.mutate(anecdote, {
      onSuccess: () => {
        dispatch({ type: 'SHOW', message: `voted "${anecdote.content}"`, duration: 3 });
      }
    })
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
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
  )
}

export default App
