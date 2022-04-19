import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/auth';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
}
    from 'firebase/auth';


export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return auth.signOut();
    }

    useEffect(() => {
    //    const unsub =  onAuthStateChanged(auth, (user) => {
    //         setLoading(true);    

    //         if(user){
    //             setUser(user);
    //             setLoading(false);
                
    //         }else{
    //             setUser(null);
    //             setLoading(false);
    //         }
    //     });
        
    //     return () => {
    //         unsub();
    //     }

   onAuthStateChanged(auth, (user) => {
        setLoading(true);    

        // if(user){
        //     setUser(user);
        //     setLoading(false);
        // }
        setUser(user);
        setLoading(false);
    });

    },[]);
   



    const value = {
        user,
        loading,
        setLoading,
        signup,
        login,
        logout
    }

   
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

