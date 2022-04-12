import React from 'react';
import { Link } from 'react-router-dom';
import {
  Alert, Card, CardContent,Typography, 
  CardActions, Button, TextField } 
  from '@mui/material';

import { makeStyles } from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './Signup.css';
import { Box } from '@mui/system';


function Signup() {

  const useStyles = makeStyles({
    text1: {
      color: 'gray',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'sans-serif'

    },
    text2:{
      color: 'gray',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      position:'relative',
      top: '-0.5rem'

    },
    card:{
      height: '6%',
      marginTop: '1rem'
    }

  });

  const classes = useStyles();

  return (
    <div className='mainContainer'>
       <div className='carousel' style={{ backgroundImage: `url('instaPhone1.png')`, backgroundSize: 'cover', border: 'none' }}>
        <div className='car'>
        </div>


      </div>
      <div className='signupCard'>
        <Card variant='outlined'>
          <div className='insta-logo'>
            <img src='instagram.png' className = 'heading'alt='instagram' />
          </div>
          <Typography
            variant='subtitle2'
            className={classes.text1}
          >Sign up to see photos and videos from your friend
          </Typography>

          <CardContent>
          { true && <Alert severity="error">This is an error alert — check it out!</Alert>}
          <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size='small' margin='dense'/>
          <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth size='small' margin='dense'/>
          <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth size='small' margin='dense'/>
          <Button variant='outlined'  htmlFor='upload-profile-btn' component='label' color='secondary' size='small' startIcon={<CloudUploadIcon/>} fullWidth margin='dense'>Upload Profile Image</Button>
          <input type = 'file' id='upload-profile-btn' style={{display:'none'}}></input>
          <Typography>
            <Box sx={{textAlign:'left',color:'gray', fontFamilt:'sans-serif', marginLeft:'2rem', marginTop: '0.3rem' }}>pic uploaded</Box>
          </Typography>
          </CardContent>
          <CardActions>
            
          <Button variant='contained' fullWidth>SIGN UP</Button>
          </CardActions>
        <CardContent>
            <Typography variant='subtitle2' className={classes.text1}>
              By signing up, you agree to our Terms, Data Policy and
              Cookies Policy
          </Typography> 
            
        </CardContent>
        </Card>

        <Card variant='outlined' className={classes.card}>
          <CardContent>
            <Typography size='small' className={classes.text2}>
            Have and account? <Link to='/login' style={{textDecoration:'underline'}}>Login</Link>

            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Signup

