import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../services/requests'
import { useNotification } from './NotificationContext';

const AnecdoteForm = () => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  const queryClient = useQueryClient()
  const { dispatch } = useNotification();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'SHOW', message: `created "${newAnecdoteMutation.content}"`, duration: 3 });
    },
    onError: (error) => {
      // Aquí manejas el error
      // Suponiendo que tu servidor responde con un JSON que incluye un campo de error
      dispatch({ type: 'SHOW', message: error.response.data.error, duration: 3 });
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
