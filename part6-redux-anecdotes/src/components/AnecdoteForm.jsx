import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../features/anecdote/notificationSlice';
import { createAnecdote } from '../features/anecdote/anecdoteSlice'


const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setNewAnecdote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createAnecdote(newAnecdote))
    setNewAnecdote('');
    dispatch(showNotification('created "' + newAnecdote + '"', 3))
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input value={newAnecdote} onChange={handleInputChange}/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
