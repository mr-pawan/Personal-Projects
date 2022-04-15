import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Alert, Card, CardContent, Typography,
    CardActions, Button, TextField
}
    from '@mui/material';

import { makeStyles } from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './Signup.css';
import { Box } from '@mui/system';
import { AuthContext } from '../../contexts/AuthProvider';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { serverTimestamp } from 'firebase/firestore';
import { addUser } from '../../services/UserServices'

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);


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
            fontFamily: 'sans-serif',
            position: 'relative',
            top: '-0.5rem'

        },
        card: {
            height: '6%',
            marginTop: '1rem'
        }

    });
    //custom styles for mui components
    const classes = useStyles();

    // remove error msg after 2 second
    const removeError = () => {
        setTimeout(() => {
            setError("");
        }, 2000);
    }

    // handle the signup 
    const { signup } = useContext(AuthContext);
    const history = useNavigate();
    const handleSubmit = async () => {
        const data = {
            email,
            password,
            fullName,
            file
        }

        if (!email || !password || !fullName || !file) {
            setError('All fileds are mandatory');
            removeError();
            return;
        }
        try {
            setLoading(true);
            const res = await signup(email, password);
            const uid = res.user.uid;
            //first upload the profile picture on storage 
            const storageRef = ref(storage, `users/${uid}/profilePicture`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', (snapshot) => {
                //progress call
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(prog);
                console.log(progress);
            }, (err) => {
                //error call
                setError(err);
                removeError();
            }, async () => {
                //success call
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                const data = {
                    email,
                    fullName,
                    id: uid,
                    profileUrl: downloadUrl,
                    postIds: [],
                    createdAt: serverTimestamp()
                }
                await addUser(data, uid);
                history('/');
                
            })
        }
        catch (err) {
            setError(err.message);
            removeError();
        }

        setEmail('');
        setPassword('');
        setFile(null);
        setFullName('');
        setLoading(false);
    }

    const handleFileChange = (e) => {
        let file = e?.target?.files[0];

        if (file) {
            setFile(e.target.files[0]);
        }

    }

    return (
        <>
            {
                loading ? <h1>Loading...</h1> :
                    <div className='mainContainer'>
                        <div className='carousel' style={{ backgroundImage: `url('instaPhone1.png')`, backgroundSize: 'cover', border: 'none' }}>
                            <div className='car'>
                            </div>
                        </div>
                        <div className='signupCard'>
                            <Card variant='outlined'>
                                <div className='insta-logo'>
                                    <img src='instagram.png' alt='instagram' />
                                </div>
                                <Typography
                                    variant='subtitle2'
                                    className={classes.text1}
                                >Sign up to see photos and videos from your friend
                                </Typography>

                                <CardContent>
                                    {error != "" && <Alert severity="error">{error}</Alert>}
                                    <TextField
                                        id="outlined-basic"
                                        label="Email"
                                        type='email'
                                        variant="outlined"
                                        fullWidth
                                        size='small'
                                        margin='dense'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Password"
                                        type='password'
                                        variant="outlined"
                                        fullWidth
                                        size='small'
                                        margin='dense'
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Full Name"
                                        variant="outlined"
                                        fullWidth
                                        size='small'
                                        margin='dense'
                                        value={fullName}
                                        autoComplete='off'
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                    <Button
                                        variant='outlined'
                                        htmlFor='upload-profile-btn'
                                        component='label'
                                        color='secondary'
                                        size='small'
                                        startIcon={<CloudUploadIcon />}
                                        fullWidth
                                        margin='dense'

                                    >Upload Profile Image
                                    </Button>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        id='upload-profile-btn'
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <Typography>
                                        <Box
                                            sx={{ textAlign: 'left', color: 'gray', fontFamilt: 'sans-serif', marginLeft: '2rem', marginTop: '0.3rem' }}
                                        >{file && file.name}
                                        </Box>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant='contained'
                                        fullWidth
                                        onClick={handleSubmit}
                                        disabled={loading}
                                    >SIGN UP
                                    </Button>
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
                                        Have and account? <Link to='/login' style={{ textDecoration: 'underline' }}>Login</Link>

                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

            }
        </>

    );
}

export default Signup
