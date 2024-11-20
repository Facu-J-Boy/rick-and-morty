import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import './App.css';
import CharacterForm from './pages/CharacterForm/CharacterForm';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, storeInterFace } from './redux/store';
import { useEffect } from 'react';
import { getAllCharacters } from './services/getAllCharacters';
import NotFound from './pages/NotFound/NotFound';

function App() {
  const { characters } = useSelector(
    (state: storeInterFace) => state.characters
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    characters.length === 0 && dispatch(getAllCharacters());
  }, [characters.length, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login type='login' />} />
        <Route path='/signup' element={<Login type='signup' />} />
        <Route path='/create' element={<CharacterForm type='create' />} />
        <Route path='/edit/:id' element={<CharacterForm type='edit' />} />
        {/* Ruta de error */}
        <Route path='*' element={<NotFound />} />
        {/* Redirige a la ruta de error cuando no se encuentra una ruta */}
        <Route path='404' element={<Navigate to='/404' />} />
      </Routes>
    </Router>
  );
}

export default App;
