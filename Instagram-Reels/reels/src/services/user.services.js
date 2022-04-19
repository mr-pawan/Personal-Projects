import { db } from '../firebase/auth';
import { 
    collection, 
    updateDoc, 
    doc, 
    setDoc
} from 'firebase/firestore'


const userCollectionRef = collection(db, 'users');

export const addUser = (data, id) => {
    return setDoc(doc(db, 'users', id), data);
}

export const updateUser = (id, olderPostIds, newPostId) => {
    const docRef = doc(db, 'users', id);
    updateDoc(docRef, {
        postIds:  olderPostIds != null ? [...olderPostIds, newPostId] : [newPostId]
    })
}


