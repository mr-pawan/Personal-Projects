import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

export default function Feed() {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <div>Feed</div>
      <button onClick = {() => logout()}>Logout</button>
    </>
  )

}
