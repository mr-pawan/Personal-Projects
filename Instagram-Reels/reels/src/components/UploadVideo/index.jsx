import React, { useState } from 'react'
import { Button, Alert, LinearProgress } from '@mui/material';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import {v4 as uuidV4} from 'uuid';
import { storage } from '../../firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';
import {addPost} from '../../services/post.services';
import {updateUser} from '../../services/user.services';

function UploadVideo({currUser}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);

    const removeError = () => {
        setTimeout(() =>{
            setError("");
        }, 2000);   
    }  

    const handleFileChange = (file) => {
        if (!file) {
            setError('Please select a file first');
            removeError();
        }
        if(file.size/(1024*1024) > 100){
            setError('File size is too big');
            removeError();
        }
        try{
           // first upload the file on storage and the use there link
           setLoading(true);
           const uid = uuidV4();
           const storageRef = ref(storage, `posts/${uid}/${file.name}`);
           const uploadTask = uploadBytesResumable(storageRef, file);

           uploadTask.on('state_changed', (snapshot) => {
               //progress call :
                const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                setProgress(prog);
                console.log('progress is ', progress);
           }, (err) => {
               //error call
                setError(err);
                removeError();
           }, async() => {
               //success call
               const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
               let obj = {
                   likes: [],
                   comments: [],
                   pId: uid,
                   pUrl: downloadUrl,
                   userName: currUser.fullName,
                   userId: currUser.id,
                   userProfile: currUser.profileUrl,
                   createdAt: serverTimestamp()
               }
               const newPost = await addPost(obj);
               await updateUser(currUser.id, currUser.postIds, newPost.id); 
               setLoading(false);
               
               
           })
        }
        catch(err){
            setLoading(false);
            console.log(err.message);
            setError(err.message);
        }

    }

    return (

        <>

            {
            error != '' ? <Alert severity="error">{error}</Alert>:
            <div>
                <Button
                    variant='outlined'
                    color='secondary'
                    startIcon={<MovieCreationIcon />}
                    component='label'
                    htmlFor='upload-video'
                    disabled={loading}
                >
                    Upload Video
                </Button>
                <input
                    type='file' accept='video/*'
                    id='upload-video'
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e.target.files[0])}
                />
                {loading && <LinearProgress color="secondary" style={{marginTop: '3%'}}/>}
                
            </div>
            }
        </>

    )
}

export default UploadVideo