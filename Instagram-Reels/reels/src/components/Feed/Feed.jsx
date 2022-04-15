import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Feed.css';
import UploadVideo from '../UploadVideo';
import {getUser} from '../../services/UserServices';
import Posts from '../Posts';
// import {collection, doc, onSnapshot} from 'firebase/firestore';
// import {db} from '../../firebase';


function Feed() {
  const { logout, user } = useContext(AuthContext);
  const [currUser, setCurrUser] = useState('');
 
  const history = useNavigate();
  const handleLogout = async () => {
    await logout();
    history('/');
  }

  useEffect(async() => {
     const res = await getUser(user.uid);
     setCurrUser(res.data());
  }, [user])

  

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