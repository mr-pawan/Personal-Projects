import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Feed from './components/Feed';
import Signup from './components/Signup';
import Login from './components/Login';
import AuthProvider, { AuthContext } from './contexts/AuthProvider';
import React, { useContext } from 'react';

function App() {
  const {user, loading} = useContext(AuthContext);

  return (
    <>
        <Routes>
          <Route path='/login' element={loading ? <h1>Loading ...</h1>:
          user ? <Navigate replace to ='/' /> 
          : <Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>

          <Route path='/' exact element={
            loading ? <h1>Loading ...</h1> : 
            user ? <Feed /> : <Navigate replace to='/login' />
          }></Route>
        </Routes>
    </>
  );
}



export default App;
