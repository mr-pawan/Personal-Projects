import React, { useState, useEffect } from 'react'
import './Posts.css'
import Video from '../Video';
import Like from '../Like'
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import {
    Dialog,
    Button,
    Card,
    CardActions,
    Typography,
    TextField,
    Avatar,
    CircularProgress
} from '@mui/material';
import Like2 from '../Like2';
import { addComment } from '../../services/comment.services';
import { updatePostWithComment } from '../../services/post.services';
import {collection, doc, onSnapshot, query, orderBy} from 'firebase/firestore';
import {db} from '../../firebase/auth';
import Comment from '../Comment';

function Posts({ currUser }) {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(null);
    const [open, setOpen] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState('');


    const handleClickOpen = (id) => {
        setOpen(id);
        };
    
        const handleClose = () => {
        setOpen(null);
        };
    

    useEffect(() => {
        setLoading(true);
        let postsArr = [];
        const postsCollectionRef =  collection(db, 'posts');
        const q =  query(postsCollectionRef, orderBy('createdAt', "desc"));
         onSnapshot(q, (snapshotArr) => {
            postsArr = [];
            snapshotArr.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id };
                postsArr.push(data);
            })
            setPosts(postsArr);
            setLoading(false);

        })
        
    }, [currUser]);

    
    const handleClick = async(postData) => {
        if(commentText == ''){
            return;
        }
        const commentObj = {
            commentText,
            userProfileUrl: currUser.profileUrl,
            userName: currUser.fullName 
        }

        const commentDoc =  await addComment(commentObj);
        await updatePostWithComment(postData.postId, postData, commentDoc.id);
        setCommentText('');
    }

    return (
        <>
            {
                (!currUser || !posts) ? <CircularProgress />
                    :loading ? <CircularProgress /> :
                    <div className='video-container'>
                        {
                            posts.map((post, index) => {
                                return (
                                    <div className='video' key={index}>
                                        <Video src={post.pUrl} />
                                        <div className='fa'>
                                            <Avatar src={currUser.profileUrl} />
                                            <h4>{currUser.fullName.split(' ')[0]}</h4>
                                        </div>
                                            <Like currUser={currUser} postData={post}></Like>
                                            <ModeCommentIcon 
                                                className='comment-icon'
                                                onClick = {() => {handleClickOpen(post.pId)}}
                                            />
                                            <Dialog
                                                open={post.pId == open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                fullWidth
                                                maxWidth='md'
                                            >
                                            <div className='modal-container'>
                                            <div className='video-modal'>
                                                <video autoPlay controls muted>
                                                    <source src = {post.pUrl} />
                                                </video>
                                            </div>
                                            <div className='comment-modal'>
                                            <Card className='card1'>                    
                                               
                                            </Card>
                                                <Card className='card2'>
                                                    <div style = {{display:'flex'}}>
                                                        <Like2 currUser={currUser} postData={post} />
                                                        <Typography style={{paddingLeft: '1rem'}} >Liked by {post.likes.length}</Typography>
                                                    </div>
                                            
                                                    <div style={{display:'flex', justifyContent:'space-around'}}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        variant="outlined"
                                                        placeholder='Add a comment'
                                                        autoComplete='off'
                                                        size='small'
                                                        fullWidth
                                                        value = {commentText}
                                                        onChange = {(e) => setCommentText(e.target.value)}
                                                        onKeyDown = {(e) => {
                                                            if(e.key == 'Enter') 
                                                                handleClick(post);
                                                        }}
                                                    />
                                                    <Button
                                                        variant='string'
                                                        size='small'
                                                        onClick = {() => {handleClick(post)}}
                                                    >
                                                        post
                                                    </Button>
                                                    </div>                   
                
                                                </Card>
                                            </div>
                                        </div>
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