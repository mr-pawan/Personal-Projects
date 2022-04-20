import './App.css';
import React, {useContext, useState} from 'react';
import { AuthContext } from './contexts/AuthProvider';
import {Routes as Router, Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Feed from './components/Feed';
import { Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import Profile from './components/Profile';

function App() {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1500)
  return(
    
    <Router>
      <Route path='/login' element={loading ? <Loading/>:
          user ? <Navigate replace to ='/' /> 
          : <Login />}></Route>

          <Route path='/signup' element={<Signup />}></Route>

          <Route path='/profile/:id' element={loading ? <Loading />
          : user ? <Profile />: <Navigate replace to='/login' />}/>

          <Route path='/' exact element={loading ? <Loading />
          : user ? <Feed /> :  <Navigate replace to='/login' />
          }></Route>
          
      </Router>

  )
  
}

export default App;
