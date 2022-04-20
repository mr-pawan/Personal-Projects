import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from '../../firebase/auth';
import { getPost } from '../../services/post.services';
import './Profile.css';
import Comment from '../Comment';
import { CircularProgress, Dialog } from '@mui/material';




function Profile() {
    const {id} = useParams();
    const [currUser, setCurrUser] = useState(null);
    const [postData, setPostData] = useState(null);

    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };
    
    const handleClose = () => {
        setOpen(null);
    };



    // first get the curr user data and there post array
    useEffect(() => {
        async function fetchUser(){
            const docRef = await doc(db, 'users', id);
            let res = null;
            onSnapshot(docRef, (snapshot) => {
                res = snapshot.data();
                setCurrUser(res);
            }) 
        }   
        fetchUser();
    },[id]);

    useEffect(() =>{
        if(currUser){
            let postArray = [];
            async function fetchPost(){
                let postArray = [];
                for(let i = 0; i < currUser.postIds.length; i++){
                    const res = await getPost(currUser.postIds[i]);
                    postArray.push({...res.data(), postId:res.id});
                }
                setPostData(postArray);
            }
            fetchPost();
        }
    }, [currUser])



  return (
    
    <>
        {
            !currUser || !postData ? <CircularProgress />
            :<>
                <Navbar currUser = {currUser}/>
                <div className='spacer' />
                <div className='upper-part'>
                    <div className='profile-img'>
                        <img src={currUser.profileUrl}/>
                    </div>
                    <div className='info'>
                        <h4>Email: {currUser.email}</h4>
                        <h5>Posts: {currUser.postIds.length}</h5>
                    </div>
                </div>
                <hr className='hrow'/>
                <div className='profile-video-container' style={{height:'70vh',display:'flex', flexWrap:'wrap'}}>
                        {
                            postData.map((post, index) => {
                                return (
                                    <div className='video' key={index} style={{ height:'15rem', margin:'1rem', border:'1px solid black'}}>
                                       <video 
                                        style={{height:'15rem',cursor:'pointer'}}
                                        onClick = {() => {handleClickOpen(post.pId)}}
                                       >
                                            <source src={post.pUrl}></source>
                                        </video> 
                                        <Dialog
                                            open={open == post.pId}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth
                                            maxWidth='md'
                                        >
                                           <Comment className='comment-container' currUser={currUser} postData = {post}/>

                                        </Dialog>
                                    </div>
                                )
                            })
                        }
                </div>
                
            </>
        }
    </>
  )
}

export default Profile