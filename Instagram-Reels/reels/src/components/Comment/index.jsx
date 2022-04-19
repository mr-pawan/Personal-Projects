import React, {useState, useEffect} from 'react'
import { getComment } from '../../services/comment.services';
import {
    Avatar,
    CircularProgress
} from '@mui/material';

function Comment({postData}) {
    const [comments, setComments] = useState('');
    useEffect(() => {
        const unsub = async() => {
            let commentArray = []
            // for(let i = 0; i < postData.comments.length; i++){
            //     let res =  await getComment(postData.comments[i]);
            //     commentArray.push(res.data());
            // }
            // setComments(commentArray);
        }
        return () => {
            unsub();
        }
    }, [postData]);

  return (
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
  )
}

export default Comment

