import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCDP1OwMmeBANWIGcZKu8837fhu6IZPeFs",
  authDomain: "gallery-3f937.firebaseapp.com",
  projectId: "gallery-3f937",
  storageBucket: "gallery-3f937.appspot.com",
  messagingSenderId: "316910104530",
  appId: "1:316910104530:web:3761f30efaee61c389220b",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

// this is the method for using the fire base
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signupUserWithEmailPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  return (
    <FirebaseContext.Provider value={{ signupUserWithEmailPassword }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
