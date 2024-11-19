import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login type='login' />} />
        <Route path='/signup' element={<Login type='signup' />} />
      </Routes>
    </Router>
  );
}

export default App;
