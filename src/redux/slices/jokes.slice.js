import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    jokes: [],
    isLoading: false,
    error: null
}

const jokeSlice = createSlice({
    name: 'jokes',
    initialState,
    reducers: {
        loadingJokes: (state, action) => {
            state.isLoading = true;
        },

        jokesLoaded: (state, action) => {
            state.isLoading = false;
            state.jokes = action.payload;
        },

        jokesHasError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const {
    jokesHasError,
    jokesLoaded,
    loadingJokes
} = jokeSlice.actions;

export default jokeSlice.reducer;