import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, updateDoc, deleteDoc, onSnapshot, increment, writeBatch, collection, query, orderBy }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

export const configured = !String(firebaseConfig.apiKey).startsWith("PASTE");
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { doc, setDoc, updateDoc, deleteDoc, onSnapshot, increment, writeBatch, collection, query, orderBy,
         signInWithEmailAndPassword, onAuthStateChanged, signOut };

// Account helpers: an account's document id is a hash of (number + PIN), so a PIN
// is never stored in readable form and a balance can only be fetched with both.
export async function accountKey(acct, pin) {
  const bytes = new TextEncoder().encode(String(acct).replace(/\D/g, "") + ":" + pin);
  const h = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(h), b => b.toString(16).padStart(2, "0")).join("");
}
export const fmtAcct = a => String(a).replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
export const money = p => "£" + (p / 100).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
