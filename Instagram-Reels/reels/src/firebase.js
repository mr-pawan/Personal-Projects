import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from './secrets';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);



const auth = getAuth(app);
export default auth;

