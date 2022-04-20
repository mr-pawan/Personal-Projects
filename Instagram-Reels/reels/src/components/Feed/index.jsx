import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import './Feed.css';
import UploadVideo from '../UploadVideo';
import Posts from '../Posts';
import {collection, doc, onSnapshot} from 'firebase/firestore';
import {db} from '../../firebase/auth';
import Loading from '../Loading';
import Navbar from '../Navbar';


function Feed() {
  const { logout, user } = useContext(AuthContext);
  const [currUser, setCurrUser] = useState('');
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    async function fetchUser(){
      const docRef = await doc(db, 'users', user.uid);
      let res = null;
      await onSnapshot(docRef, (snapshot) => {
        res = snapshot.data();
        setCurrUser(res);
      })
    }
    fetchUser();
  }, [user]);



  return (
    <>
    <Navbar currUser={currUser}/>
      <div className='main-page'>
          <UploadVideo currUser = {currUser}/>
          <Posts currUser = {currUser}/> 
      </div>
      
      
    </>
  )
}

export default Feed

