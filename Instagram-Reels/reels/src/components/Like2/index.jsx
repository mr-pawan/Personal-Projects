import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Like2.css'
import {updateLike, updateUnlike} from '../../services/post.services';

function Like2({currUser, postData}) {
    const [like, setLike] = useState(null);

    //first check for this user whenever i liked this video or not
    // if like i'll show as like otherwise show as unlike
    useEffect(() => {
        let check = postData.likes.includes(currUser.id)?true:false;
        setLike(check); 
    },[postData]);

    const handleLike = () => {
        if(like){
           // if it is already like then on click it will remove currUser like
            updateUnlike(postData.postId, postData, currUser);
        }else{
            //then it will turn into like
            updateLike(postData.postId, postData, currUser);
        }
        
    }


  return (

    like != null ?
    <>
        {
            like ? <FavoriteIcon  onClick = {handleLike}  className='like' />
            :<FavoriteIcon onClick = {handleLike} className = 'unlike'/>
        }
    </>
    :
    <></>  

  )
}

export default Like2