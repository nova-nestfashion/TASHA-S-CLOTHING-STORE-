import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBRfkCsPshp9z5AX9LyxpEV1FE-9mVAmWo",
  authDomain: "tasha-s-clothing-store.firebaseapp.com",
  projectId: "tasha-s-clothing-store",
  storageBucket: "tasha-s-clothing-store.firebasestorage.app",
  messagingSenderId: "660733815646",
  appId: "1:660733815646:web:92254e1951e2000f2d7dcf",
  measurementId: "G-JT78G56KPS"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

const db = getFirestore(app);


export { auth, db };