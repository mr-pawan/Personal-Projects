import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material';
import { Avatar, Dialog } from '@mui/material';
import './Posts.css'
import Video from '../Video';
import Like from '../Like'
import { db } from '../../firebase/auth';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Comment from '../Comment';
import ModeCommentIcon from '@mui/icons-material/ModeComment';



function Posts({ currUser }) {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(null);


    const handleClickOpen = (id) => {
        setOpen(id);
    };
    
    const handleClose = () => {
        setOpen(null);
    };
      
    useEffect(() => {
       async function fetchPosts(){
        let postsArr = [];
        const postsCollectionRef = await collection(db, 'posts');
        const q = await query(postsCollectionRef, orderBy('createdAt', "desc"));
         await onSnapshot(q, (snapshotArr) => {
            setLoading(true);
            postsArr = [];
            snapshotArr.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id };
                postsArr.push(data);
            })
            setLoading(false);
            setPosts(postsArr);

        })
       }
       fetchPosts();

       return(()=> {
           fetchPosts();    
       })
        
    }, []);


 

    const callback = (entries) => {
        entries.forEach(async(entry) => {
            let ele = entry.target.childNodes[0];
            console.log(ele);
            ele.play().then(() => {
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause();
                }
            })
        })
      }
      

    let observer = new IntersectionObserver(callback, {
        threshold:0.6,
    });

    useEffect(() => {
        const elements = document.querySelectorAll('.videos');
        elements.forEach((element) => {
            observer.observe(element);
        })
        return () => {
            observer.disconnect();
        }
      }, [posts])

    return (
        <>
            {
                !currUser || !posts || loading ? <CircularProgress />
                    :
                    <div className='video-container' id='110'>
                        {
                            posts.map((post, index) => {
                                return (
                                    <div className='videos' key={index}>
                                        <Video src={post.pUrl} />
                                        <div className='fa'>
                                            <Avatar src={currUser.profileUrl} />
                                            <h4>{currUser.fullName.split(' ')[0]}</h4>
                                        </div>
                                        <Like currUser={currUser} postData={post}></Like>
                                        <ModeCommentIcon 
                                            className='comment-container'
                                            onClick={() => {handleClickOpen(post.pId)}}
                                            style={{color:'gray'}}
                                        />
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

            }
        </>
    )
}
export default Posts

