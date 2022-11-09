import { combineReducers } from '@reduxjs/toolkit';
import jokesSlice from './slices/jokes.slice';

const rootReducer = combineReducers({
    jokes: jokesSlice
})

export { rootReducer };