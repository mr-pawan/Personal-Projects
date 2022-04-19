import { LinearProgress } from '@mui/material';
import React from 'react'
import './Loading.css';
function Loading() {
  return (
   <div className='main-container'>
        <div className='loading-container'>
            <img className='logo' src='insta-logo.png'></img>
            <LinearProgress className='progress-bar' color="secondary" />
        </div>
    </div>
  )
}

export default Loading