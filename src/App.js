import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import './App.css';
import { getJokes } from './redux/actions/jokes.actions';
import Footer from './sections/footer';
import Header from './sections/header';
import JokeDetails from './sections/joke-details';
import JokeList from './sections/joke-list';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jokes, isLoading, error } = useSelector(state => state.jokes);
  const [selectedTag, setSelectedTag] = useState('');
  const [jokeList, setJokeList] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    const location = window.location.pathname;
    if (location === '/details' && searchKey) {
      navigate(`/?searchKey=${searchKey}`)
    }
    dispatch(getJokes(selectedTag || searchKey));
  }, [selectedTag, searchKey]);

  useEffect(() => {
    if (jokes) {;  
      if(jokes.total === 1 && searchKey){
        navigate(`/details/${jokes.result[0].id}`)
      }
      setJokeList(jokes.result);
    }
  }, [jokes, searchKey]);

  return (
    <div className="App">
      <Header setSearchKey={setSearchKey} setSelectedTag={setSelectedTag} />
      <Routes>
        <Route index element={<JokeList jokes={jokeList} setSelectedTag={setSelectedTag} selectedTag={selectedTag} loading={isLoading} searchKey={searchKey} />} />
        <Route path="/details/:id" element={<JokeDetails jokes={jokeList} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
