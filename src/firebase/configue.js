import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDP1OwMmeBANWIGcZKu8837fhu6IZPeFs",
    authDomain: "gallery-3f937.firebaseapp.com",
    projectId: "gallery-3f937",
    storageBucket: "gallery-3f937.appspot.com",
    messagingSenderId: "316910104530",
    appId: "1:316910104530:web:832fdb6d0a9f45be89220b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };