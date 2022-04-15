import React from 'react'
import { db } from '../firebase'
import { 
    collection, 
    addDoc, 
    deleteDoc, 
    updateDoc, 
    getDocs,
    getDoc, 
    doc, 
    onSnapshot, 
    setDoc
} from 'firebase/firestore'


const userCollectionRef = collection(db, 'users');

export const addUser = (data, id) => {
    // return addDoc(userCollectionRef, user);
    return setDoc(doc(db, 'users', id), data);
}

export const getUser = (id) => {
    const docRef = doc(db, 'users', id);
   return getDoc(docRef);
}
export const updateUser = (id, olderPostIds, newPostId) => {
    const docRef = doc(db, 'users', id);
    updateDoc(docRef, {
        postIds:  olderPostIds != null ? [...olderPostIds, newPostId] : [newPostId]
    })
}
