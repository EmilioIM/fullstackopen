import { createSlice, current } from '@reduxjs/toolkit';

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: String(anecdote),
        id: getId(),
        votes: 0
    }
}

const initialState = {
    anecdotes: anecdotesAtStart.map(asObject),
    filter: ''
}

export const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        create: (state, action) => {
            const newAnecdote = asObject(action.payload)
            state.anecdotes.push(newAnecdote)
        },
        vote: (state, action) => {
            const anecdoteToIncrement = state.anecdotes.find(a => a.id === action.payload)
            if (anecdoteToIncrement) {
                anecdoteToIncrement.votes += 1;
            }

            console.log(current(state))
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        }
    },
});

export const { vote, create, setFilter } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;