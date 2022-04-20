import React from 'react';
import './Video.css';
import ReactDOM from 'react-dom';


function Video({ src }) {

  const clickHandler = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  }

  const handleEnded = (e) => {
    const next =  ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if(next){
      next.scrollIntoView();
      e.target.muted = true;
    }
  }


  

  return (
    <>
        <video className='video-style'
          muted='muted'
          onClick={clickHandler}
          onEnded = {handleEnded}
          
        >
        <source src={src} type='video/mp4'/>
        </video>
    </>
  )
}

export default Video;



