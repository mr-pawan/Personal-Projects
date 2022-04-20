import { db } from "../firebase/auth";
import { 
    collection, 
    addDoc, 
    getDoc, 
    updateDoc, 
    doc, 
    query,
    orderBy,
    onSnapshot
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


export const getPosts = async() => {
    const q =  await query(postCollectionRef, orderBy('createdAt', "desc"));
    let postsArray = [];
    onSnapshot(q, (snapshotArr) => {
        postsArray = [];
        snapshotArr.forEach((doc) => {
            let data = { ...doc.data(), postId: doc.id };
            postsArray.push(data);
        })
    })
    return postsArray;
}

export const getPost = async(id) => {
    const docRef = await doc(db, 'posts', id);
    return getDoc(docRef);
}
