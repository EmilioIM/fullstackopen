import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { create } from '../features/anecdote/anecdoteSlice';
import { showNotification, clearNotification } from '../features/anecdote/notificationSlice';


const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setNewAnecdote(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(create(newAnecdote));
    setNewAnecdote('');
    dispatch(showNotification('created "' + newAnecdote + '"'))
    setTimeout(() => dispatch(clearNotification()), 5000);
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
