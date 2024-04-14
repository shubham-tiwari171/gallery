import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  child,
  get,
  limitToFirst,
  query,
  startAfter,
} from "firebase/database";
// import { getDocs, doc, collection } from "firebase/firestore";

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
let lastKey = null;

const PAGE_SIZE = 5;

export const getData = async () => {
  try {
    const recentPostsRef = lastKey
      ? query(dbRef, limitToFirst(5), startAfter(lastKey))
      : query(dbRef, limitToFirst(5));

    const snapshot = await get(recentPostsRef);

    if (snapshot.exists()) {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        const item = {
          key: childSnapshot.key,
          value: childSnapshot.val(),
        };
        data.push(item);
      });

      // Update lastKey for the next pagination
      if (data.length > 0) {
        lastKey = data[data.length - 1].key;
        console.log("Last Key:", lastKey);
      }

      console.log("Data:", data);
    } else {
      console.log("No more data available");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};
