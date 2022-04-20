import React, {useState, useEffect} from 'react'
import './Comment.css';
import {
    Button,
    Card,
    Typography,
    TextField,
    Avatar,
    CircularProgress
} from '@mui/material';

import Like2 from '../Like2';
import { addComment } from '../../services/comment.services';
import { updatePostWithComment } from '../../services/post.services';
import { getComment } from '../../services/comment.services';

function Comment({currUser, postData}) {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(null);


    const handleClick = async(e) => {
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


    useEffect(() => {
       async function fetchData(){
        let commentArray = []
        for(let i = 0; i < postData.comments.length; i++){
            let res =  await getComment(postData.comments[i]);
            commentArray.push(res.data());
        }
        setComments(commentArray);
       }

       fetchData();
    

    }, [postData]);


    return (
        <>
            <div className='modal-container'>
                <div className='video-modal'>
                    <video autoPlay controls muted>
                        <source src = {postData.pUrl} />
                    </video>
                </div>
                <div className='comment-modal'>
                <Card className='card1'>                    
                    <div>
                    {
                        comments==null ? <CircularProgress /> :
                        <>
                            {
                                comments.map((comment, index) => {
                                    return(
                                    <div className='profile-box' key={index}>
                                        <Avatar src={comment.userProfileUrl} />
                                        <p className='avatar'><span className='name'>{comment.userName}</span>&nbsp;&nbsp; {comment.commentText}</p>
                                    </div>
                                )
                                })
                            }
                        </>
                    }
                    </div>
                    
                </Card>
                    <Card className='card2'>
                        <div style = {{display:'flex'}}>
                            <Like2 currUser={currUser} postData={postData} />
                            <Typography style={{paddingLeft: '1rem'}} >Liked by {postData.likes.length}</Typography>
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
                                    handleClick();
                            }}
                        />
                        <Button
                            variant='string'
                            size='small'
                            onClick = {handleClick}
                        >
                            post
                        </Button>
                        </div>                   
                
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Comment