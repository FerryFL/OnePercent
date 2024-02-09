import {BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar'
import Create from './pages/Create';
import Update from './pages/Update'
import About from './pages/About';
import Review from './pages/Review';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">

      <BrowserRouter>
        {user?<Navbar/>:''}
        <div>
          <Routes>
            <Route path='/' element={user?<Home/>:<Navigate to='/login' />} />
            <Route path='/create' element={user?<Create/>:<Navigate to='/login' />} />
            <Route path='/update/:id' element={user?<Update/>:<Navigate to='/login' />} />
            <Route path='/about' element={user?<About/>:<Navigate to='/login' />} />
            <Route path='/review' element={user?<Review/>:<Navigate to='/login' />} />
            <Route path='/login' element={user?<Navigate to='/' />:<Login/>} />
            <Route path='/signup' element={user?<Navigate to='/' />:<Signup/>} />
            {/* Catch-all route for any other paths */}
            <Route path='*' element={<Navigate to='/login' />} />
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;



