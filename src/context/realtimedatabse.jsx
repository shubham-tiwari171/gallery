import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  child,
  get,
  limitToFirst,
  query,
} from "firebase/database";
import { getDocs, doc, collection } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  databaseURL: "https://pixico-566d9-default-rtdb.firebaseio.com",
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase();

const dbRef = ref(db, "images");
export const getData = async () => {
  try {
    const recentPostsRef = query(dbRef, limitToFirst(5));
    const snapshot = await get(recentPostsRef);

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const lastKey = childSnapshot.key;
        console.log(lastKey);
      });
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};
