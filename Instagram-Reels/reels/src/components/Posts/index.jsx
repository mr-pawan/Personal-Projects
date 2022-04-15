import React, {useState, useEffect} from 'react'
import {CircularProgress} from '@mui/material';
import {getPosts} from '../../services/Posts.Services';
import {onSnapshot} from 'firebase/firestore';
import './Posts.css'
import Video from '../Video';

function Posts({currUser}) {
    const [posts, setPosts] = useState(null);

    useEffect(async() => {
       const unsub = async() => {
        const postsArr = await getPosts();
        setPosts(postsArr);
       } 
       return unsub();
     
    },[]);

    console.log(currUser);
    console.log(posts);
    
  return (
      <>
        {
            !currUser || !posts ? <CircularProgress /> 
            :
                <div className='video-container'>
                    {
                        posts.map((post, index) => {
                            return(
                                <div className='video' key={index}>
                                    <Video src={post.pUrl}/>
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