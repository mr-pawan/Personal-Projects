import { db } from "../firebase/auth";

import{
    collection,
    doc,
    addDoc,
    deleteDoc,
    getDoc,
    updateDoc,
    setDoc,
} from 'firebase/firestore';

const commentCollectionRef = collection(db, 'comments');


export const addComment = (commentObj) => {
    return addDoc(commentCollectionRef, commentObj);
}

export const getComment = async(id) => {
    const docRef = await doc(db, 'comments', id);
    return getDoc(docRef);
}
