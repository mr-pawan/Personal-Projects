import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const userCollectionRef = collection(db, 'users');

class UserServices{
    addUser = (user) => {
        return addDoc(userCollectionRef, user);
    }
}

export default new UserServices;