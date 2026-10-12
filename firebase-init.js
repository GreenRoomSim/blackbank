import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, orderBy }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

export const configured = !String(firebaseConfig.apiKey).startsWith("PASTE");
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { doc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, orderBy,
         signInWithEmailAndPassword, onAuthStateChanged, signOut };
