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


function Feed() {
  const { logout, user } = useContext(AuthContext);
  const [currUser, setCurrUser] = useState('');
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();
  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    navigate(0);
  }

  useEffect(async() => {
    const docRef = await doc(db, 'users', user.uid);
    let res = null;
    onSnapshot(docRef, (snapshot) => {
      res = snapshot.data();
      setCurrUser(res);
    })
  }, [user]);

  return (
    <>
      <div className='main-page'>
        <div>Feed</div>
        <div>
          <Button
            variant="contained"
            onClick={handleLogout}
          >Logout
          </Button>
        </div>
          <UploadVideo currUser = {currUser}/>
          <Posts currUser = {currUser}/> 
      </div>
      
      
    </>
  )
}

export default Feed

