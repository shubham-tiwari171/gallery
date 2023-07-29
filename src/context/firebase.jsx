// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1REgnLg8Ho5w1bjXx_xpFyzrOTab3H3E",
  authDomain: "pixico-566d9.firebaseapp.com",
  projectId: "pixico-566d9",
  storageBucket: "pixico-566d9.appspot.com",
  messagingSenderId: "580818149224",
  appId: "1:580818149224:web:98792b188f98a5906800dd",
  measurementId: "G-4S5P1LLJS5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const usersCollectionRef = collection(db, "users");
export const storage = getStorage(app);

export const getUserByUserName = async (userName, email) => {
  try {
    const q = query(usersCollectionRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q);
    // const users = querySnapshot.docs.map((doc) => doc.data());
    // return users;
    return querySnapshot;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Error fetching user data.");
  }
};

export const getUserLoggedIn = async (email, password) => {
  try {
    const q = query(
      usersCollectionRef,
      where("email", "==", email),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => doc.data());
    return users[0];
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Error fetching user data.");
  }
};

export const getUserByEmail = async (email) => {
  try {
    const q = query(usersCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    // const users = querySnapshot.docs.map((doc) => doc.data());
    // return users;
    return querySnapshot;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Error fetching user data.");
  }
};

export const addUser = async (user) => {
  try {
    const docRef = await addDoc(usersCollectionRef, user);
    return docRef;
  } catch (error) {
    throw new Error("Error adding document: " + error);
  }
};

export const updateUser = async (userdocId, newData) => {
  try {
    // Use the 'updateDoc' function to update an existing document in the 'users' collection
    await updateDoc(doc(usersCollectionRef, userdocId), newData);
    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
};

// New function to delete user data
export const deleteUser = async (userId) => {
  try {
    // Use the 'deleteDoc' function to delete an existing document from the 'users' collection
    await deleteDoc(doc(usersCollectionRef, userId));
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
};

export const getUser = async (userdocId) => {
  try {
    let q = doc(usersCollectionRef, userdocId);
    const querySnapshot = await getDoc(q);
    const users = querySnapshot.data();
    return users;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
};

export const uplaodProfileImage = async (profileImageName, profileImage) => {
  try {
    const fileFolderRef = ref(storage, `profileImages/${profileImageName}`);
    await uploadBytes(fileFolderRef, profileImage);
    const imageUrl = await getDownloadURL(fileFolderRef);
    return imageUrl;
  } catch (error) {
    console.error("Uploading file: ", error);
    return false;
  }
};

export const isProfileImageExist = async (profileImageName) => {
  try {
    const fileFolderRef = ref(storage, `profileImages/`);
    const listOfImages = (await listAll(fileFolderRef)).items.map(
      (item) => item.name
    );
    // return listOfImages.includes(profileImageName);
    let value = listOfImages.includes(profileImageName);
    if (value) {
      await deleteObject(storage, `profileImages/${profileImageName}`);
      return true;
    }
    return true;
  } catch (error) {
    console.error("Error checking profile image existence: ", error);
    return false;
  }
};
