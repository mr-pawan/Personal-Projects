import { db } from "../firebase/auth";
import { 
    collection, 
    addDoc, 
    getDoc, 
    updateDoc, 
    doc, 
} from "firebase/firestore";

const postCollectionRef = collection(db, 'posts');

export const addPost = (post) => {
    return addDoc(postCollectionRef, post);
}

export const updateLike = async(postId, postData, currUser) => {
    const docRef = await doc(db, 'posts', postId);
    await updateDoc(docRef, {
        likes: postData.likes != null ? [...postData.likes, currUser.id] : [currUser.id]
    })
}

export const updateUnlike = async(postId, postData, currUser) =>{
    const docRef = await doc(db, 'posts', postId);
    const filterArr = postData.likes.filter((el) => {
        return el!=currUser.id
    });
    await updateDoc(docRef, {
        likes: filterArr
    })
}

export const updatePostWithComment = (postId, postData, commentId) => {
    const docRef = doc(db, 'posts', postId);
    updateDoc(docRef, {
        comments: postData.comments != null ? [...postData.comments, commentId]: [commentId]
    })
}