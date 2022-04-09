import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import {signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from '../secrets';
import auth from '../firebase';



export const AuthContext = React.createContext()
export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logout = () => {
        return auth.signOut();
    }
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
                setLoading(false);

            }else{
                setUser(null)
                setLoading(false);
            }
        })
        

        
    }, []);


    const value = {
        login,
        logout,
        signup,
        user,
        setUser,
        loading, setLoading
    }
    return (
    <>
          <AuthContext.Provider value = {value}>
              {children}
          </AuthContext.Provider>
    </>
  )
}

