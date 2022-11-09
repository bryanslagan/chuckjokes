import axios from "axios";
import jokesSlice, { jokesHasError, jokesLoaded, loadingJokes } from "../slices/jokes.slice";
import { dispatch } from "../store";

export function getJokes(keyword = ""){
    
    return async () => {
        dispatch(loadingJokes());
        try{
            const result = await axios.get(`https://api.chucknorris.io/jokes/search?query=${keyword ? keyword : "all"}`)
            const data = result.data;
            dispatch(jokesLoaded(data));
        } catch (e) {
            dispatch(jokesHasError(e.message));
        }
    }
}

export function likeJoke(id){
    let likedJokes = localStorage.getItem('likedJokes') ?? '{}';
    likedJokes = JSON.parse(likedJokes);
    if(likedJokes[id]){
        likedJokes[id] = likedJokes[id] + 1;
    } else {
        likedJokes[id] = 1;
    }
    localStorage.setItem('likedJokes', JSON.stringify(likedJokes));
}

export function dislikeJoke(id){
    let dislikedJokes = localStorage.getItem('dislikedJokes') ?? '{}';
    dislikedJokes = JSON.parse(dislikedJokes);
    if(dislikedJokes[id]){
        dislikedJokes[id] = dislikedJokes[id] + 1;
    } else {
        dislikedJokes[id] = 1;
    }
    localStorage.setItem('dislikedJokes', JSON.stringify(dislikedJokes));
}

export function getJokeInterractions(id){
    let likedJokes = localStorage.getItem('likedJokes') ?? '[]';
    let dislikedJokes = localStorage.getItem('dislikedJokes') ?? '[]';
    likedJokes = JSON.parse(likedJokes);
    dislikedJokes = JSON.parse(dislikedJokes);
    return {likedJokes, dislikedJokes};
}