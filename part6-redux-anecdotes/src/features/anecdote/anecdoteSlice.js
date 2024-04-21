import { createSlice, current } from '@reduxjs/toolkit';
import anecdoteService from '../../services/anecdotes'

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(set(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.create(content)
        dispatch(create(newAnecdote))
    }
}

export const voteAnecdote = id => {
    return async dispatch => {
        await anecdoteService.vote(id)
        dispatch(vote(id))
    }
}

export const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        create: (state, action) => {
            state.push(action.payload)
        },
        vote: (state, action) => {
            const anecdoteToIncrement = state.find(a => a.id === action.payload)
            if (anecdoteToIncrement) {
                anecdoteToIncrement.votes += 1;
            }

            console.log(current(state))
        },
        set: (state, action) => action.payload
    },
});

export const { vote, create, set } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
