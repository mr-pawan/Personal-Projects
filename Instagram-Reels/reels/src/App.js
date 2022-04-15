import './App.css';
import React, {useContext} from 'react';
import { AuthContext } from './contexts/AuthProvider';
import {Routes as Router, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Feed from './components/Feed/Feed';
import { Navigate } from 'react-router-dom';


function App() {
  const {user, loading} = useContext(AuthContext);
  return (
   <>
{/* 
    <Router>
      <Route path = '/login' element={
        loading ? <h1>Loading...</h1> 
        :user ? <Navigate replace to='/'/> 
        :<Login />} 
      />
      <Route path = '/signup' element = {<Signup />} />
      <Route path = '/' exact element = {
        loading ? <h1>Loading...</h1>: 
        !user ? <Navigate replace to= '/login'/>
        :<Feed />  
      } />
    </Router> */}

     <Router>
          <Route path='/login' element={loading ? <h1>Loading ...</h1>:
          user ? <Navigate replace to ='/' /> 
          : <Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>

          <Route path='/' exact element={
            loading ? <h1>Loading ...</h1> : 
            user ? <Feed /> : <Navigate replace to='/login' />
          }></Route>
        </Router>

   </>
  );
}

export default App;
