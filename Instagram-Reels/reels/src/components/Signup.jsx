import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import UserServices from '../services/user.services';


export default function Signup() {

  // user credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);
  const { signup } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);

  const history = useNavigate();

  const handleSignUp = async(e) => {
    e.preventDefault();

    try {
      const res = await signup(email, password);
      // after signup we got a user object in which we get uid 
      const uid = res.user.uid;
      const storageRef = ref(storage, `users/${uid}/profilePic`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        //progress call
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
        console.log(prog);
      }, (err) => {
        //error call
        console.log(err);
      }, async () => {
        //success call
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const data = {
          username,
          email,
          userId: uid,
          profileUrl: downloadUrl,
          postIds: []
        }
        await UserServices.addUser(data);
      })
    }
    catch (err) {
      console.log(err);
    }

    setEmail("");
    setPassword("");
    setUsername("");
    setFile(null);
    history("/");


  }

  const handleFileChange = (e) => {
    let file = e?.target?.files[0];

    if (file) {
      setFile(e.target.files[0]);
    }
  }


  return (
    <div>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="">UserName</label>
          <input type="text" value={username}
            onChange={(e) => { setUsername(e.target.value) }} />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" value={email}
            onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}></input>
        </div>
        <div>
          <label htmlFor="">Profile Image</label>
          <input type="file" accept="image/*"
            onChange={(e) => { handleFileChange(e) }} />                </div>
        <button type="submit" disabled={loader}>SignUp</button>
      </form>
    </div>


  )
}
