import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyANg0da06FZpoYuEct1B0X_HEv7c89P3jU",
  authDomain: "netflix-clone-1cee1.firebaseapp.com",
  projectId: "netflix-clone-1cee1",
  storageBucket: "netflix-clone-1cee1.appspot.com",
  messagingSenderId: "827226686313",
  appId: "1:827226686313:web:9837018f64d5c82a85b3f8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


export { auth };
export default db;

