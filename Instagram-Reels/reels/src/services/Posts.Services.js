import { db } from "../firebase";
import { 
    collection, 
    addDoc, 
    getDoc, 
    updateDoc, 
    doc, 
    deleteDoc, 
    setDoc,
    onSnapshot,
    query,
    orderBy
} from "firebase/firestore";

const postCollectionRef = collection(db, 'posts');

export const addPost = (post) => {
    return addDoc(postCollectionRef, post);
}


export const getPosts = async() => {
    let postsArr = [];
    const q = await query(postCollectionRef, orderBy('createdAt'));
    await onSnapshot(q, (snapshotArr) => {
        snapshotArr.forEach((doc) => {
            let data = {...doc.data(), postId: doc.id};
            postsArr.push(data);
        })
    });

    return postsArr;

}