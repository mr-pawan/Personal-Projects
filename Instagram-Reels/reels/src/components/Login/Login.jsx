import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert, Card, CardContent, Typography,
  CardActions, Button, TextField
}
  from '@mui/material';

import { makeStyles } from '@mui/styles';
import './Login.css';
import image1 from '../../Assets/1.jpg';
import image2 from '../../Assets/2.jpg';
import image3 from '../../Assets/3.jpg';
import image4 from '../../Assets/4.jpg';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import { AuthContext } from '../../contexts/AuthProvider';



function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  



  const useStyles = makeStyles({
    text1: {
      color: 'gray',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'sans-serif'

    },
    text2: {
      color: 'gray',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      position: 'relative',
      top: '-0.6rem'


    },
    card: {
      height: '9%',
      marginTop: '1rem'
    }

  });

  const classes = useStyles();

  const {login} = useContext(AuthContext);
  const history = useNavigate();

  const handleSubmit = async() => {
    setError('');
    if(!email || !password){
      setError('All fileds are mandatory');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    try{
      setLoader(true);
      await login(email, password);
      history('/');

    }catch(err){
      setError(err.message);
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    setEmail('');
    setPassword('');
    setLoader(false);
    
  }

  return (
    <>
      {
        loader ? <h1>Loading ...</h1>:
        <div className='mainContainer'>
      <div className='carousel' style={{ backgroundImage: `url('instaPhone1.png')`, backgroundSize: 'cover', border: 'none' }}>
        <div className='car'>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={4}
          >
            <Slider>
              <Slide index={0}><Image src={image1} /></Slide>
              <Slide index={1}><Image src={image2} /></Slide>
              <Slide index={2}><Image src={image3} /></Slide>
              <Slide index={3}><Image src={image4} /></Slide>

            </Slider>
          </CarouselProvider>
        </div>


      </div>
      <div className='loginCard'>
        <Card variant='outlined'>
          <div className='insta-logo'>
            <img className='heading' src='instagram.png' alt='instagram' />
          </div>

          <CardContent>
            {error != '' && <Alert severity="error">{error}</Alert>}
            <TextField 
              id="outlined-basic" 
              label="Email" 
              variant="outlined" 
              fullWidth 
              size='small' 
              margin='dense' 
              type='email'
              value = {email}
              onChange = {(e) => {setEmail(e.target.value)}}  
            />
            <TextField 
              id="outlined-basic" 
              label="Password" 
              variant="outlined" 
              fullWidth 
              size='small' 
              margin='dense' 
              type='password'
              value = {password}
              onChange = {(e) => {setPassword(e.target.value)}}  
            />
          </CardContent>
          <CardActions>

            <Button 
              variant='contained' 
              fullWidth
              onClick = {handleSubmit}    
            > SIGN UP
              </Button>
          </CardActions>

        </Card>

        <Card variant='outlined' className={classes.card}>
          <CardContent>
            <Typography size='small' className={classes.text2}>
              Have and account? <Link to='/signup' style={{ textDecoration: 'underline' }}>Sign up</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>

    </div> 
      }
    </>
  );
}

export default Login
